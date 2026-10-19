import java.util.*;

/** 第 1–4 课练习。保留 TODO，让检查器给出具体反馈。JDK 21。 */
public class TicketLab {
    public enum Status { OPEN, CLOSED }
    public static final class Ticket {
        private final long id;
        private final String title;
        private Status status = Status.OPEN;
        public Ticket(long id, String rawTitle) {
            this.id = id;
            this.title = normalizeTitle(rawTitle);
        }
        public long id() { return id; }
        public String title() { return title; }
        public Status status() { return status; }
        public void close() {
            // TODO 2：只允许 OPEN -> CLOSED，重复关闭抛 IllegalStateException。
            throw new UnsupportedOperationException("TODO 2: close");
        }
        public void reopen() {
            // TODO 3：只允许 CLOSED -> OPEN。
            throw new UnsupportedOperationException("TODO 3: reopen");
        }
    }
    public static String normalizeTitle(String raw) {
        // TODO 1：拒绝 null / 纯空白；strip 后长度上限100；返回处理后标题。
        throw new UnsupportedOperationException("TODO 1: normalizeTitle");
    }
    public static final class Repository {
        private final Map<Long, Ticket> data = new HashMap<>();
        public void create(Ticket ticket) {
            // TODO 4：重复 ID 抛 IllegalArgumentException，不覆盖已有对象。
            throw new UnsupportedOperationException("TODO 4: create");
        }
        public Optional<Ticket> findById(long id) {
            // TODO 5：不存在返回 Optional.empty()。
            throw new UnsupportedOperationException("TODO 5: findById");
        }
        public List<Ticket> findOpen() {
            // TODO 6：只返回 OPEN，按 ID 升序，列表不可增删（不要求深拷贝）。
            throw new UnsupportedOperationException("TODO 6: findOpen");
        }
    }
}
