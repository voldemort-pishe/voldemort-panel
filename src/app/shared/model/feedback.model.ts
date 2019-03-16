import { FeedbackRating } from './enumeration/feedback-rating';
import { UserModel } from './user.model';

export interface FeedbackModel {
    id: number;
    userId: number;
    candidateId: number;
    feedbackText: string;
    rating: FeedbackRating;
}

export interface FeedbackContentModel {
    data: FeedbackModel;
    include: {
        owner: UserModel;
    };
}