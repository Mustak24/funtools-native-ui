import { ReactNode } from "react"

export type ShowWhenProps = {
  when: boolean
  children: ReactNode
  otherwise?: ReactNode
}


export type ShowWhenReturnType = (
    ShowWhenProps['when'] extends true ? (
        ShowWhenProps['children']
    ) : (
        ShowWhenProps['otherwise'] extends ReactNode ? ReactNode : null
    )
)

export function ShowWhen({ when, children, otherwise=null }: ShowWhenProps): ShowWhenReturnType {
  return when ? children: otherwise
}