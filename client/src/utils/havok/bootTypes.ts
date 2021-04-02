import {ApiItem,Spec} from '../types'

interface BootSpec {
    spec: Spec;
}
type BootStatus = unknown;
export type JavaBoot = ApiItem<BootSpec,BootStatus>
export type PythonBoot = ApiItem<BootSpec,BootStatus>
export type NodeJSBoot = ApiItem<BootSpec,BootStatus>
export type PhpBoot = ApiItem<BootSpec,BootStatus>
export type WebBoot = ApiItem<BootSpec,BootStatus>
