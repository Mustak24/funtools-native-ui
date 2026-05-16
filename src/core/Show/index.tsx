import { ReactNode } from "react"

export type ShowProps = {
  when: boolean
  children: ReactNode
  otherwise?: ReactNode
}


export type ShowReturnType = (
    ShowProps['when'] extends true ? (
        ShowProps['children']
    ) : (
        ShowProps['otherwise'] extends ReactNode ? ReactNode : null
    )
)

export function Show({ when, children, otherwise=null }: ShowProps): ShowReturnType {
  return when ? children: otherwise
}