import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 font-mono">
      <div className="bg-[#FFD9E5]/40 border border-[#E696AF] rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-[#FFD9E5] p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-[#C44569]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold mb-2 text-lg lg:text-xl">
              Rate Limit Reached
            </h3>
            <p className="text-base-content mb-2 text-sm lg:tetext-md">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-base-content/80 text-sm lg:tetext-md">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;