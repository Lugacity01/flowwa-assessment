import { supabase } from "./supabase";

export const claimDailyStreak = async (userId) => {
  const { data, error } = await supabase.rpc("claim_daily_reward", {
    uid: userId,
  });

  if (error) throw error;
  return data; // returns new streak count
};
