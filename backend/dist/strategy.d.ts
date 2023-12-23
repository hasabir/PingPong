import Strategy from "passport-42";
import { UserService } from './auth/user_service';
declare const FortyTwoStrategy_base: new (...args: any[]) => Strategy;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, user: any, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
