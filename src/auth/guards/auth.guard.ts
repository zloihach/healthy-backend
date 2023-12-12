import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}