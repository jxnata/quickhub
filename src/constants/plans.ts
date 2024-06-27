import { features } from "process";

export const plans = {
    free: {
        name: 'Free',
        description: 'For small projects',
        features: [
            'GitHub integration',
            'Email support',
            'AI features*',
        ],
        price: 0,
        price_id: '',
        limits: {
            projects: 1,
            tasks: 10,
            users: 1
        }
    },
    pro: {
        name: 'Pro',
        description: 'For medium projects',
        features: [
            'GitHub integration',
            'Email support',
            'AI features',
            'Private projects',
        ],
        price: 2990,
        price_id: '',
        limits: {
            projects: 10,
            tasks: 500,
            users: 20
        }
    },
    enterprise: {
        name: 'Enterprise',
        description: 'For large projects',
        features: [
            'GitHub integration',
            'Email support',
            'AI features',
            'Private projects',
        ],
        price: 4990,
        price_id: '',
        limits: {
            projects: 100,
            tasks: 5000,
            users: 100
        }
    }
}