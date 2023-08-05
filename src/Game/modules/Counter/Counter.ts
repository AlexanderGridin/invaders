export class Counter {
  private value = 0;

  public getValue(): number {
    this.value++;
    return this.value;
  }
}
