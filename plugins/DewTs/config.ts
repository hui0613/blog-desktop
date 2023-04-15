export type DewWatchOptions = {
  include: string
  baseUrl?: string
  outDir?: string
  moduleRoot?: string
}

export type DewTsOptions = {} & DewWatchOptions

export type DewBuildOptions = {
  moduleRoot: string
  filepath: string
}
