import { Request } from 'express'
import { UserDocument } from './models/userModel'

export interface queryStrType { keyword: string, page: number }

export interface CustomRequest<T = any> extends Request {
    user?: UserDocument
    body: T
}
