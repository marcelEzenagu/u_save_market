function SkeletonOrderCard() {
  return (
    <div className="rounded-md border p-5 mt-4 animate-pulse">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="space-y-2 w-72 md:w-80">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/5"></div>
      </div>
      <div className="mt-5 border-t pt-4 flex flex-row gap-4 overflow-x-scroll">
        {[1, 2, 3, 4, 5].map((e) => (
          <div className="w-[170px]">
            <div className="w-[170px]">
              {" "}
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="h-4 bg-gray-300 rounded w-2/3 "></div>
                <div className="h-3 bg-gray-300 rounded w-2/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonOrderCard;
