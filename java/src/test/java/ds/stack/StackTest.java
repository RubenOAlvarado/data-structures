package ds.stack;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.Test;

class StackTest {

  @Test
  void startsEmpty() {
    Stack<Integer> stack = new Stack<>();
    assertEquals(0, stack.size());
    assertTrue(stack.isEmpty());
  }

  @Test
  void growsWithEachPush() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    assertEquals(2, stack.size());
    assertFalse(stack.isEmpty());
  }

  @Test
  void peeksAtTheLastPushedValueWithoutRemovingIt() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    assertEquals(2, stack.peek());
    assertEquals(2, stack.size());
  }

  @Test
  void popsValuesInLifoOrder() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    assertEquals(3, stack.pop());
    assertEquals(2, stack.pop());
    assertEquals(1, stack.pop());
    assertEquals(0, stack.size());
  }

  @Test
  void popAndPeekThrowWhenEmpty() {
    Stack<Integer> stack = new Stack<>();
    assertThrows(NoSuchElementException.class, stack::pop);
    assertThrows(NoSuchElementException.class, stack::peek);
    assertEquals(0, stack.size());
  }

  @Test
  void canBeReusedAfterBeingEmptied() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.pop();
    assertTrue(stack.isEmpty());
    stack.push(2);
    assertEquals(2, stack.peek());
    assertEquals(1, stack.size());
  }

  @Test
  void keepsLifoOrderWhenPushAndPopAreInterleaved() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    assertEquals(2, stack.pop());
    stack.push(3);
    assertEquals(3, stack.pop());
    assertEquals(1, stack.pop());
  }

  @Test
  void iteratesFromTopToBottomWithoutModifyingTheStack() {
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    assertEquals(List.of(3, 2, 1), toList(stack));
    assertEquals(List.of(3, 2, 1), toList(stack));
    assertEquals(3, stack.size());
  }

  @Test
  void worksWithNonNumericValues() {
    Stack<String> stack = new Stack<>();
    stack.push("a");
    stack.push("b");
    assertEquals("b", stack.pop());
    assertEquals("a", stack.peek());
  }

  @Test
  void storesFalsyValuesLikeAnyOtherValue() {
    Stack<Object> stack = new Stack<>();
    stack.push(0);
    stack.push("");
    stack.push(false);
    stack.push(null);
    assertEquals(4, stack.size());
    assertNull(stack.pop());
    assertEquals(false, stack.pop());
    assertEquals("", stack.pop());
    assertEquals(0, stack.peek());
    assertFalse(stack.isEmpty());
  }

  @Test
  void handlesManyValues() {
    Stack<Integer> stack = new Stack<>();
    int count = 100_000;
    for (int i = 0; i < count; i++) {
      stack.push(i);
    }
    assertEquals(count, stack.size());
    for (int expected = count - 1; expected >= 0; expected--) {
      assertEquals(expected, stack.pop());
    }
    assertTrue(stack.isEmpty());
  }

  private static <T> List<T> toList(Iterable<T> iterable) {
    List<T> values = new ArrayList<>();
    iterable.forEach(values::add);
    return values;
  }
}
