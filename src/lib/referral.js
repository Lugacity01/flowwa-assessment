import { supabase } from "./supabase";

export const getReferralStats = async (userId) => {
  const { data, error } = await supabase
    .from("referrals")
    .select("id")
    .eq("referrer_id", userId);

  if (error) throw error;

  return {
    referrals: data.length,
    pointsEarned: data.length * 25,
  };
};
