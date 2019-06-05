import { Pipe, PipeTransform } from '@angular/core';
import { FeedbackRating } from '../model/enumeration/feedback-rating';

@Pipe({ name: 'feedbackRating' })
export class FeedbackRatingPipe implements PipeTransform {
    transform(value: FeedbackRating): string {
        switch (value) {
            case FeedbackRating.STRONG_NEGATIVE: return 'بد';
            case FeedbackRating.NEGATIVE: return 'متوسط';
            case FeedbackRating.POSITIVE: return 'خوب';
            case FeedbackRating.STRONG_POSITIVE: return 'عالی';
            default: return '[تعریف نشده]';
        }
    }
}
