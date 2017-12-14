import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';

@Injectable()
export class SceneService {
  constructor(private appService: AppService) {}
}
