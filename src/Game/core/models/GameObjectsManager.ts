import { Render, Update } from "../interfaces";

export abstract class GameObjectsManager implements Update, Render {
  public abstract update(): void;
  public abstract render(): void;
}
