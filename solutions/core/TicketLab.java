import java.util.*;

/** 第一组练习参考实现。仅用于单线程；元素不是深不可变。 */
public class TicketLab {
    public enum Status { OPEN, CLOSED }
    public static final class Ticket {
        private final long id;
        private final String title;
        private Status status = Status.OPEN;
        public Ticket(long id, String rawTitle) { this.id=id; this.title=normalizeTitle(rawTitle); }
        public long id() { return id; }
        public String title() { return title; }
        public Status status() { return status; }
        public void close() {
            if (status != Status.OPEN) throw new IllegalStateException("工单已经关闭");
            status=Status.CLOSED;
        }
        public void reopen() {
            if (status != Status.CLOSED) throw new IllegalStateException("工单尚未关闭");
            status=Status.OPEN;
        }
    }
    public static String normalizeTitle(String raw) {
        if (raw == null || raw.isBlank()) throw new IllegalArgumentException("标题不能为空");
        String title=raw.strip();
        if (title.length()>100) throw new IllegalArgumentException("标题过长");
        return title;
    }
    public static final class Repository {
        private final Map<Long, Ticket> data=new HashMap<>();
        public void create(Ticket ticket) {
            Objects.requireNonNull(ticket,"ticket");
            if (data.containsKey(ticket.id())) throw new IllegalArgumentException("ID重复");
            data.put(ticket.id(),ticket);
        }
        public Optional<Ticket> findById(long id) { return Optional.ofNullable(data.get(id)); }
        public List<Ticket> findOpen() {
            return data.values().stream().filter(t->t.status()==Status.OPEN)
                .sorted(Comparator.comparingLong(Ticket::id)).toList();
        }
    }
}
