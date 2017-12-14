import { Component, OnInit } from '@angular/core';
import { SceneService } from './scene.service';

@Component({
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [SceneService]
})
export class SceneComponent implements OnInit {
  constructor(private sceneService: SceneService) {}

  ngOnInit() {}
}
