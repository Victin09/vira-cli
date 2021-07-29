import passport, { use, initialize } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy, StrategyOption as StrategyOptionFacebook, VerifyFunction as VerifyFunctionFacebook } from 'passport-facebook';
import { Strategy as GoogleStrategy, StrategyOptions as StrategyOptionGoogle, Profile, VerifyCallback as VerifyFunctionGoogle } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy, StrategyOption as StrategyOptionLinkedin, VerifyFunction as VerifyFunctionLinkedin } from 'passport-linkedin-oauth2';

import { ACCESS_TOKEN, FACEBOOK, GOOGLE, GITHUB, LINKEDIN } from '@config/environment.config';
import { AuthService } from '@services/auth.service';

/**
 * Authentication configuration
 */
class Authentication {
    /**
     * @description Authentication instance
     */
    private static instance: Authentication;

    /**
     * @description Default options
     */
    private options = {
        jwt: {
            secretOrKey: ACCESS_TOKEN.SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
    };

    private constructor() {}

    /**
     * @description Authentication singleton getter
     */
    static get(): Authentication {
        if (!Authentication.instance) {
            Authentication.instance = new Authentication();
        }
        return Authentication.instance;
    }

    /**
     * @description Wrap passport method
     */
    initialize(): any {
        return initialize() as unknown;
    }

    /**
     * @description Enable available auth strategies
     */
    plug(): void {
        use(this.factory('jwt'));
        [FACEBOOK, GITHUB, GOOGLE, LINKEDIN]
            .filter((provider) => provider.IS_ACTIVE)
            .forEach((provider) => {
                use(this.factory(provider.KEY));
            });
    }

    /**
     * @description Provide a passport strategy instance
     *
     * @param strategy Strategy to instanciate
     */
    private factory(strategy: string): passport.Strategy {
        switch (strategy) {
            case 'jwt':
                return new JwtStrategy(this.options.jwt, AuthService.jwt);
            case 'facebook':
                return new FacebookStrategy(
                    {
                        clientID: FACEBOOK.ID,
                        clientSecret: FACEBOOK.SECRET,
                        callbackURL: FACEBOOK.CALLBACK_URL,
                        profileFields: ['id', 'link', 'email', 'name', 'picture', 'address'],
                    } as StrategyOptionFacebook,
                    AuthService.oAuth as unknown as VerifyFunctionFacebook,
                );
            case 'google':
                return new GoogleStrategy(
                    {
                        clientID: GOOGLE.ID,
                        clientSecret: GOOGLE.SECRET,
                        callbackURL: GOOGLE.CALLBACK_URL,
                        scope: ['profile', 'email'],
                    } as StrategyOptionGoogle,
                    AuthService.oAuth as unknown as VerifyFunctionGoogle,
                );
            case 'github':
                return new GithubStrategy(
                    {
                        clientID: GITHUB.ID,
                        clientSecret: GITHUB.SECRET,
                        callbackURL: GITHUB.CALLBACK_URL,
                        scope: ['profile', 'email'],
                    },
                    AuthService.oAuth,
                );
            case 'linkedin':
                return new LinkedInStrategy(
                    {
                        clientID: LINKEDIN.ID,
                        clientSecret: LINKEDIN.SECRET,
                        callbackURL: LINKEDIN.CALLBACK_URL,
                        scope: ['profile', 'email'],
                    } as StrategyOptionLinkedin,
                    AuthService.oAuth as unknown as VerifyFunctionLinkedin,
                );
        }
    }
}

const instance = Authentication.get();

export { instance as Authentication };
