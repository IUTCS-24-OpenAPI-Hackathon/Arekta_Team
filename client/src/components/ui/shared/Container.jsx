/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils"

const Container = ({children, className}) => {
  return (
    <div className={cn("w-full px-2 mx-auto max-w-7xl lg:px-0", className)}>{children}</div>
  )
}

export default Container