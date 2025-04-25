function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex items-center justify-center space-x-2">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
      <p className="mt-4 text-base-content/70">Processing image...</p>
    </div>
  );
}

export default Loading;
