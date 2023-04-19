import type { ProjectManifest } from '@pnpm/types'
import * as path from 'path'
import { existsSync, mkdirSync } from 'fs-extra'

const getPackageManifest = (pkgPath: string) => {
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (pkgPath: string): Record<'dependencies' | 'peerDependencies' | 'devDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {}, devDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
    devDependencies: Object.keys(devDependencies),
  }
}

export const generateExternal = async (options: { full: boolean }) => {
  const vertPackage = path.resolve(process.cwd(), 'package.json')
  const { dependencies, peerDependencies, devDependencies } = getPackageDependencies(vertPackage)

  return (id: string) => {
    const packages: string[] = peerDependencies

    if (!options.full) {
      packages.push('@vue', ...dependencies, ...devDependencies)
    }

    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}

export function ensureDir(filePath: string) {
  const dirPath = path.dirname(filePath)
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}
