import { CronJob } from "cron";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";

// this function will delete the user data from database if the user has not verified for more than a minute

const removeOldUnverifiedUsers = async () => {
  try {
    const cutoff = new Date(Date.now() - 60 * 1000); // 1 minute ago
    const unverifiedUsers = await User.find({ isVerified: false, createdAt: { $lt: cutoff } });

    // Extract the user IDs of the unverified users
    const unverifiedUserIds = unverifiedUsers.map(user => user._id);

    if (unverifiedUserIds.length > 0) {
      // Delete unverified users
      await Token.deleteMany({ _id: { $in: unverifiedUserIds } });
      const { acknowledged, deletedCount } = await User.deleteMany({ _id: { $in: unverifiedUserIds } });
      // console.log(`${deletedCount} unverified users older than 1 minute have been deleted`);
    }
  } catch (error) {
    console.error('Error removing old unverified users:', error);
  }
};



// Schedule to run every minutes (for testing, adjust as needed for production)

// this function will run every minutes and send the control to removeOldUnverifiedUsers() function

const scheduledTime = "* * * * *" // every minutes

const job = new CronJob(scheduledTime, async () => {
  await removeOldUnverifiedUsers();
  // console.log("Job finished");
});

export const startCronJobs = () => {
  job.start();
  console.log("Cron jobs started");
};

//how calculation works
// 1000 miliseconds = 1 second
// 60 * 1000 = 60 seconds = 1 minute
// 60 * 60 * 1000 = 1 minute * 60 = 1 hour
// 24 * 60 * 60 * 1000 = 24 * 1 hour = 24 hours = 1 day


// *   *   *   *   *   *   *
// |   |   |   |   |   |   |
// |   |   |   |   |   |   +-- Day of the week (0 - 7) (Sunday to Saturday, both 0 and 7 represent Sunday)
// |   |   |   |   |   +------ Month (1 - 12)
// |   |   |   |   +---------- Day of the month (1 - 31)
// |   |   |   +-------------- Hour (0 - 23)
// |   |   +------------------ Minute (0 - 59)
// |   +---------------------- Second (0 - 59)
// +-------------------------- (Optional, if using cron with seconds) 


