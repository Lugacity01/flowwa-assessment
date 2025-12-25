import React, { useEffect, useState } from "react";
import { Copy, Users, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { getCurrentUser } from "../../lib/auth";
import { getReferralStats } from "../../lib/referral";

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", bg: "bg-blue-600", icon: Facebook },
  { name: "X", href: "https://x.com", bg: "bg-gray-900", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", bg: "bg-blue-500", icon: Linkedin },
  { name: "WhatsApp", href: "https://wa.me/234XXXXXXXXXX", bg: "bg-green-500", icon: MessageCircle },
];

const ReferralCard = () => {
  const [referrals, setReferrals] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReferralData = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        setReferralLink(`${window.location.origin}/signup?ref=${user.id}`);

        const stats = await getReferralStats(user.id);
        setReferrals(stats.referrals);
        setPointsEarned(stats.pointsEarned);
      } finally {
        setLoading(false);
      }
    };

    loadReferralData();
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };


  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center space-y-2">
            <div className="h-8 w-16 bg-gray-200 rounded mx-auto" />
            <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="text-center space-y-2">
            <div className="h-8 w-16 bg-gray-200 rounded mx-auto" />
            <div className="h-3 w-24 bg-gray-200 rounded mx-auto" />
          </div>
        </div>

        {/* Link */}
        <div className="mb-4">
          <div className="h-3 w-40 bg-gray-200 rounded mb-2" />
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Social buttons */}
        <div className="flex gap-3 justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-9 h-9 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="text-purple-600" size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Share Your Link</h4>
          <p className="text-sm text-gray-600">
            Invite friends and earn 25 points when they join!
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{referrals}</div>
          <div className="text-sm text-gray-600">Referrals</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">{pointsEarned}</div>
          <div className="text-sm text-gray-600">Points Earned</div>
        </div>
      </div>

      {/* LINK */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your personal referral link:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          />
          <button
            onClick={copyLink}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            aria-label="Copy link"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="flex gap-3 justify-center">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 ${social.bg} text-white rounded-full hover:scale-105 transition`}
              aria-label={social.name}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ReferralCard;
