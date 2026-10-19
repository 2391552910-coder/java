import java.util.*;

/** 无外部依赖的行为检查，不需要 -ea。失败会返回非零退出码。 */
public class Check {
    private static int passed, failed;
    private static void test(String name, Runnable action) {
        try { action.run(); passed++; System.out.println("PASS " + name); }
        catch (Throwable ex) { failed++; System.out.println("FAIL " + name + ": " + ex); }
    }
    private static void equal(Object expected, Object actual) {
        if (!Objects.equals(expected, actual)) throw new AssertionError("expected=" + expected + ", actual=" + actual);
    }
    private static void raises(Class<? extends Throwable> type, Runnable action) {
        try { action.run(); }
        catch (Throwable ex) {
            if (type.isInstance(ex)) return;
            throw new AssertionError("expected " + type.getSimpleName() + ", got " + ex);
        }
        throw new AssertionError("expected " + type.getSimpleName() + ", but no exception");
    }
    public static void main(String[] args) {
        test("trim", () -> equal("Agent", TicketLab.normalizeTitle("  Agent  ")));
        test("null rejected", () -> raises(IllegalArgumentException.class, () -> TicketLab.normalizeTitle(null)));
        test("blank rejected", () -> raises(IllegalArgumentException.class, () -> TicketLab.normalizeTitle(" \t ")));
        test("100 accepted", () -> equal("a".repeat(100), TicketLab.normalizeTitle("a".repeat(100))));
        test("101 rejected", () -> raises(IllegalArgumentException.class, () -> TicketLab.normalizeTitle("a".repeat(101))));
        test("close and reopen", () -> { var t = new TicketLab.Ticket(1,"A"); t.close(); equal(TicketLab.Status.CLOSED,t.status()); t.reopen(); equal(TicketLab.Status.OPEN,t.status()); });
        test("double close rejected", () -> { var t = new TicketLab.Ticket(1,"A"); t.close(); raises(IllegalStateException.class,t::close); });
        test("open cannot reopen", () -> { var t = new TicketLab.Ticket(1,"A"); raises(IllegalStateException.class,t::reopen); });
        test("missing id", () -> equal(Optional.empty(),new TicketLab.Repository().findById(9)));
        test("duplicate preserves original", () -> { var r = new TicketLab.Repository(); r.create(new TicketLab.Ticket(1,"A")); raises(IllegalArgumentException.class,() -> r.create(new TicketLab.Ticket(1,"B"))); equal("A",r.findById(1).orElseThrow().title()); });
        test("open only sorted", () -> { var r = new TicketLab.Repository(); var closed = new TicketLab.Ticket(2,"B"); closed.close(); r.create(new TicketLab.Ticket(3,"C")); r.create(closed); r.create(new TicketLab.Ticket(1,"A")); equal(List.of(1L,3L),r.findOpen().stream().map(TicketLab.Ticket::id).toList()); });
        test("list unmodifiable", () -> { var r = new TicketLab.Repository(); r.create(new TicketLab.Ticket(1,"A")); raises(UnsupportedOperationException.class,() -> r.findOpen().clear()); });
        System.out.println("\n" + passed + " passed, " + failed + " failed");
        if (failed > 0) System.exit(1);
    }
}
