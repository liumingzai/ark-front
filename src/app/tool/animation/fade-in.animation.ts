import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition('* <=> *', [
    style({
      opacity: 0
    }),
    animate(
      '.5s ease',
      style({
        opacity: 1
      })
    )
  ])
]);
