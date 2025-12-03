import User from "../models/User.model.js";
import Post from "../models/Post.model.js";
import SharePost from "../models/SharePost.model.js";
import Proposal from "../models/Proposal.model.js";

export const getEngagementStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    //TOTAL POSTS
    const totalPosts = await Post.countDocuments({}); 
    const sharePosts = await Post.countDocuments({ type: "share" });
    const exchangePosts = await Post.countDocuments({ type: "exchange" });

    //TOTAL SHARES
    const totalShares = await SharePost.countDocuments({});

    //TOTAL PROPOSALS
    const totalProposals = await Proposal.countDocuments({});

    //UNIQUE ENGAGED USERS
    const engagedUsersSet = new Set();

    const posts = await Post.find({}).select("userId");
    posts.forEach(p => engagedUsersSet.add(p.userId.toString()));

    const shares = await SharePost.find({}).select("senderId receiverId");
    shares.forEach(s => {
      engagedUsersSet.add(s.senderId.toString());
      engagedUsersSet.add(s.receiverId.toString());
    });

    const proposals = await Proposal.find({}).select("senderId receiverId");
    proposals.forEach(p => {
      engagedUsersSet.add(p.senderId.toString());
      engagedUsersSet.add(p.receiverId.toString());
    });

    const engagedUsers = engagedUsersSet.size;

    //MONTHLY TREND (Last 6 months, including posts, shares, proposals)
    const postsTrend = await Post.aggregate([
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } }
    ]);

    const sharesTrend = await SharePost.aggregate([
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } }
    ]);

    const proposalsTrend = await Proposal.aggregate([
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } }
    ]);

    // Merge all trends by year-month
    const trendMap = new Map();
    [...postsTrend, ...sharesTrend, ...proposalsTrend].forEach(item => {
      const key = `${item._id.year}-${item._id.month}`;
      if (!trendMap.has(key)) trendMap.set(key, 0);
      trendMap.set(key, trendMap.get(key) + item.count);
    });

    const monthlyTrend = Array.from(trendMap.entries())
      .map(([k, count]) => {
        const [year, month] = k.split("-").map(Number);
        return { _id: { year, month }, totalPosts: count };
      })
      .sort((a, b) => b._id.year - a._id.year || b._id.month - a._id.month)
      .slice(0, 6);

    //RETURN RESPONSE
    return res.status(200).json({
      success: true,
      stats: {
        totalPosts,
        sharePosts,
        exchangePosts,
        totalShares,
        totalProposals,
        engagedUsers,
        monthlyTrend,
      },
    });
  } catch (error) {
    console.log("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
