import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/user/guard/auth.guard";

/**
 * User authentication decorator.
 * This decorator is used to apply the authentication-related decorators
 */
export function AuthDecorator() {
	return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth("Authorization"));
}
