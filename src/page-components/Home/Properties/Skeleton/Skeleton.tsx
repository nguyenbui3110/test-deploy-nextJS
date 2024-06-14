const Skeleton = () => {
  return (
    <div className="w-[500px] space-y-5 rounded-2xl bg-[rgba(120,182,245,0.1)] p-4 bg-gradient-to-r from-transparent via-rose-100/10 to-transparent">
      <div className="h-24 rounded-lg bg-[#fff]"></div>
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-[#fff] animate-pulse"></div>
        <div className="h-3 w-4/5 rounded-lg bg-[#fff] animate-pulse"></div>
        <div className="h-3 w-2/5 rounded-lg bg-[#fff] animate-pulse"></div>
      </div>
    </div>
  )
}

export default Skeleton
