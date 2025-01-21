import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  private items: string[] = ['Item 1', 'Item 2', 'Item 3']; // Sample data

  // Get all items
  getAllItems(): string[] {
    return this.items;
  }

  // Create a new item
  createItem(item: string): string {
    this.items.push(item);
    return `Item "${item}" created successfully!`;
  }

  // Update an item
  updateItem(index: number, updatedItem: string): string {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = updatedItem;
      return `Item at index ${index} updated to "${updatedItem}"!`;
    }
    return 'Item not found!';
  }

  // Delete an item
  deleteItem(index: number): string {
    if (index >= 0 && index < this.items.length) {
      const deletedItem = this.items.splice(index, 1);
      return `Item "${deletedItem[0]}" deleted successfully!`;
    }
    return 'Item not found!';
  }
}
