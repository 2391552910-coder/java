/* 单一内容源：互动页与 Markdown 讲义均由本文件生成。 */
(function (root) {
  const lessons = [];
  function add(id, week, title, minutes, intro, sections, python, code, exercise, hints, answer, checks, quizzes) {
    lessons.push({id, week, title, minutes, intro, sections, python, code, exercise, hints, answer, checks, quizzes});
  }
  add('00', '准备', '先跑起来：JDK、编译与第一个程序', 45,
    '今天只完成一件事：在自己的电脑运行 Java，并能解释源文件、编译器和 JVM 各做什么。你已有 Python 基础，不需要重新学习循环的概念。',
    [
      ['三个角色', 'JDK 是开发工具包，包含 javac 编译器、java 启动器及其他工具。javac 把 .java 源码编译为 .class 字节码；java 启动 JVM 执行字节码。编译期发现的类型错误与运行时异常是两类问题：前者让程序无法构建，后者在具体输入触发时才出现。'],
      ['安装与检查', '安装一个 JDK 21，使用发行商的正式安装程序，例如 Eclipse Temurin。编辑器可以用已有的 IntelliJ IDEA 或 VS Code。重新打开终端，运行 java -version 和 javac -version，两者均应存在且主版本一致。如果 java 有而 javac 没有，先检查是否安装的是 JDK，以及 PATH 指向了哪个目录；不要连续随机重装。'],
      ['文件与入口', '把下方代码保存为 Hello.java。public 类名必须与文件名对应。main 是本例入口；String[] args 是命令行参数数组。System.out.println 用来观察结果。先在终端跑通，再使用 IDE 的运行按钮，这样出错时能区分工具配置与代码问题。']
    ],
    'Python 常用 python hello.py 直接运行；这里先执行 javac Hello.java，再执行 java Hello。类名后的运行命令没有 .class 后缀。Java 也有源文件启动方式，本课先使用显式编译流程。',
    {lang:'java', text:'public class Hello {\n    public static void main(String[] args) {\n        String topic = args.length > 0 ? args[0] : "Java";\n        System.out.println("开始学习 " + topic);\n    }\n}', explain:'编译后执行 java Hello Agent，输出“开始学习 Agent”；不传参数时输出“开始学习 Java”。三元表达式只选择一个分支，避免直接读取不存在的 args[0]。'},
    '运行 Hello.java，并新增第二行输出“今天完成第 0 课”。再主动删掉一行末尾的分号，观察编译错误；修复后重新编译。',
    ['先分别检查 java 与 javac 的版本，不要从复杂 IDE 工程开始。','类名 Hello、文件名 Hello.java 要保持一致；中文文件使用 UTF-8 保存。','可用 javac -encoding UTF-8 Hello.java 明确指定源码编码，再用 java Hello Agent 运行。'],
    '在 main 内加入 System.out.println("今天完成第 0 课");。缺少分号时通常在编译阶段失败；编译失败后不要把旧 .class 的运行结果误认为新代码已生效。',
    ['终端能输出 JDK 与编译器版本','无参数与有参数两种运行结果正确','能区分编译失败与运行异常'],
    [
      {q:'javac 发现类型错误后，应该先做什么？', options:['继续执行旧的 .class 证明修改有效','修复源码并重新编译','修改数据库配置'], correct:1, explanation:'编译失败意味着没有生成本次修改对应的可执行字节码。旧产物可能仍存在。'},
      {q:'本例 javac Hello.java 成功后，运行命令是什么？', options:['java Hello','java Hello.class','javac Hello.class'], correct:0, explanation:'java 的类启动方式接收类名；javac 是编译器。'}
    ]);

  add('01', '1', '类型、字符串与异常：把输入变成可信数据', 60,
    '业务后端经常接收不完整或错误的输入。今天用工单标题理解静态类型、引用与边界校验，而不是背一遍语法表。',
    [
      ['类型在什么时候约束你', 'int 保存整数值，boolean 保存真假，String 是引用类型。String title = 42 无法通过编译。var 只是让编译器推断局部变量类型，不会变成 Python 那样的动态绑定；var x = 1 后仍不能给 x 赋字符串。Long 等包装类型可以为 null；把 null 自动拆箱为 long 会在运行时出错。'],
      ['字符串比较与空值', '== 比较引用是否指向同一对象，字符串内容比较使用 equals。不要因为常量池让某次 == 恰好返回 true 就依赖它。先判 null 再调用方法；&& 从左到右短路，可以用来保护后面的操作。isBlank 能识别空字符串和纯空白，strip 去除两端空白，但不会改变原字符串。'],
      ['异常表达失败', '异常沿调用栈向上传播，直到被合适的 catch 处理。IllegalArgumentException 是运行时异常，适合本课的非法参数。不要捕获后返回一个假成功，也不要把所有异常都转换成同一句“系统错误”导致无法诊断。Java 还有受检异常，需要捕获或在方法上声明；先掌握遇到编译提示时怎样处理。']
    ],
    'Python 的 str.strip() 返回新字符串；Java 的 String.strip() 也是如此。Python 的 == 通常用于内容比较，不能原样迁移到 Java 引用类型。',
    {lang:'java',text:'public static String normalizeTitle(String raw) {\n    if (raw == null || raw.isBlank()) {\n        throw new IllegalArgumentException("标题不能为空");\n    }\n    String title = raw.strip();\n    if (title.length() > 100) {\n        throw new IllegalArgumentException("标题不能超过100个UTF-16代码单元");\n    }\n    return title;\n}',explain:'|| 也会短路：raw 为 null 时不会执行 isBlank。length() 统计 UTF-16 代码单元，部分 emoji 占两个；如果产品要求按用户可见字符计数，需要另行定义规则，不能把它简单称为“字数”。'},
    '实现 normalizeTitle，覆盖 null、空白、两端空格、恰好 100 与 101 个 ASCII 字符。预测 new String("OPEN") == new String("OPEN") 的结果，再运行验证。',
    ['先处理 null，再调用字符串方法。','去两端空白后再检查长度，保留处理后的结果。','用 "a".repeat(100) 和 "a".repeat(101) 构造边界输入。'],
    '示例函数可作为一种参考实现。两个独立 new String 的 == 结果为 false，equals 结果为 true；内容相同不代表对象身份相同。',
    ['五类边界输入均验证','能解释短路求值','能解释字符串内容与引用比较的区别'],
    [
      {q:'raw 为 null 时，哪个表达式可以安全判断为空？',options:['raw.isBlank() || raw == null','raw == null || raw.isBlank()','raw.equals(null)'],correct:1,explanation:'短路求值在左边为 true 时跳过右边，从而不对 null 调用方法。'},
      {q:'var x = 1; 后再写 x = "1"; 会怎样？',options:['自动变成 String','编译失败','只在运行时失败'],correct:1,explanation:'var 推断出的局部变量仍然是静态类型 int。'}
    ]);

  add('02', '1', '对象与接口：让业务规则有自己的位置', 75,
    '如果 Controller、脚本和工具调用都能直接把工单改成任意状态，业务规则很快会失去一致性。今天把规则放回对象，并用接口隔离存储方式。',
    [
      ['字段不是随意修改的字典', '对象把数据与有效操作组织在一起。private 字段限制外部代码直接改状态；通过方法执行合法转换。例如 OPEN 可以关闭，CLOSED 不能重复关闭。构造器负责建立合法初始状态。封装的目的不是机械地给每个字段生成 getter/setter，而是减少无效状态的入口。'],
      ['接口定义合作方式', 'TicketRepository 接口声明 findById 和 save，使用者依赖这个约定，不必知道数据来自内存还是数据库。TicketService 接收一个实现该接口的对象，这就是依赖注入的朴素形式，不需要 Spring 才能使用。测试时可以注入内存实现。只有一个实现且没有替换需求的类，也不必强行配接口。'],
      ['引用与不可变数据', '把对象赋给另一个变量会复制引用，不会复制整个对象。Java 参数传递始终是值传递：对象参数传入的是引用值的副本，因此能修改对象内部状态，但重新赋值参数不会改变调用者变量指向。record 适合传输数据，自动提供访问器与值比较，但内部引用的集合不因此自动深度不可变。']
    ],
    '可以把接口理解为显式声明的合作契约，和 Python Protocol 的用途有相似之处；Java 会在编译时检查具体实现。不要把 Java 每个类都理解成必须设计复杂继承树。',
    {lang:'java',text:'enum Status { OPEN, CLOSED }\n\nfinal class Ticket {\n    private final long id;\n    private Status status = Status.OPEN;\n    Ticket(long id) { this.id = id; }\n    long id() { return id; }\n    Status status() { return status; }\n    void close() {\n        if (status != Status.OPEN) {\n            throw new IllegalStateException("工单已经关闭");\n        }\n        status = Status.CLOSED;\n    }\n}',explain:'final 字段 id 只能赋值一次；status 通过 close 修改。枚举可以用 == 比较。例子是领域对象片段，不是带 main 的独立程序。'},
    '增加标题字段，在构造器中复用上一课的校验逻辑。增加 reopen 方法，只允许 CLOSED → OPEN。用两个变量指向同一 Ticket，观察通过一个变量关闭后另一个变量看到什么。',
    ['先画出两种状态和允许的箭头。','reopen 与 close 一样，先检查旧状态，再修改。','Ticket a = new Ticket(1); Ticket b = a; a.close(); 随后检查 b.status()。'],
    'b 也看到 CLOSED，因为两个变量保存了指向同一对象的引用。reopen 在 CLOSED 时设置 OPEN，在其他状态抛业务异常。不要让外部直接写 status。',
    ['非法关闭与非法重开均拒绝','标题构造时经过校验','能解释对象修改与参数重新赋值的区别'],
    [
      {q:'Ticket b = a; 后修改 a 对应对象的状态，b 会看到变化吗？',options:['会，它们指向同一个对象','不会，赋值会深拷贝','仅用了 Spring 才会'],correct:0,explanation:'赋值复制引用值，不复制对象。'},
      {q:'把存储依赖作为构造器参数传入，最直接的好处是什么？',options:['自动开启数据库事务','可以在测试中替换存储实现','自动避免全部线程安全问题'],correct:1,explanation:'显式依赖可由调用者提供，也容易注入测试替身；事务和线程安全需要独立设计。'}
    ]);

  add('03', '2', '集合与泛型：实现内存版工单仓库', 75,
    '把零散对象组织成可查询的仓库。先掌握集合选择和数据所有权，再写 Stream；代码短不等于更容易维护。',
    [
      ['根据访问方式选集合', 'ArrayList 适合顺序遍历，按下标访问快；按工单 ID 查找用 HashMap<Long, Ticket> 更直接。HashSet 用来去重。Map 的键依赖 equals/hashCode，作为键的对象如果参与散列计算的字段被修改，会导致难以理解的查找问题。Long 等不可变键能减少这类风险。HashMap 不保证遍历顺序。'],
      ['泛型与空结果', 'Map<Long, Ticket> 让编译器限制键和值的类型，读取时通常不需要强制转换。Map.get 找不到时返回 null，本课选择在仓库层返回 Optional<Ticket>，明确“可能不存在”；不要到处 get() 而不处理为空。Optional 不是所有字段都要套上的装饰。'],
      ['别泄露内部集合', '直接返回内部 values 视图可能让调用者删除仓库数据。List.copyOf 提供不可修改的列表快照，但里面 Ticket 若可变仍可能被修改；不可修改列表不等于深拷贝。真正跨边界返回时可转换成不可变 DTO。Stream 的 filter/map/toList 适合清晰的数据流水线，涉及复杂分支时普通循环更直观。']
    ],
    'Map 类似 dict，但键值类型在编译期固定。List.copyOf 类似做一个受限的浅快照，不是 Python deepcopy。',
    {lang:'java',text:'import java.util.*;\n\nfinal class MemoryTicketRepository {\n    private final Map<Long, Ticket> data = new HashMap<>();\n    void save(Ticket ticket) { data.put(ticket.id(), ticket); }\n    Optional<Ticket> findById(long id) {\n        return Optional.ofNullable(data.get(id));\n    }\n    List<Ticket> findOpen() {\n        return data.values().stream()\n            .filter(t -> t.status() == Status.OPEN)\n            .toList();\n    }\n}',explain:'依赖上一课的 Ticket 与 Status。findOpen 返回列表不能增删，但对象本身仍然可变。此仓库只用于单线程练习，不宣称线程安全。'},
    '实现保存、查询、只列出 OPEN 工单。再返回按 ID 升序排列的结果，验证不存在的 ID 不会引发空指针异常。',
    ['保存前决定相同 ID 是覆盖还是拒绝，并写入契约。','不存在时使用 Optional.empty；调用方可以 orElseThrow。','排序可用 sorted(Comparator.comparingLong(Ticket::id))。'],
    '在 filter 后增加 sorted，再调用 toList。对重复 ID 的行为没有唯一答案，但必须明确且测试；为创建接口通常选择拒绝重复，而更新接口另设规则。',
    ['覆盖空仓库、缺失 ID、重复 ID','查询顺序不依赖 HashMap 的偶然顺序','能解释列表快照与对象可变性的区别'],
    [
      {q:'List.copyOf(tickets) 能保证列表中 Ticket 对象完全不可变吗？',options:['能，自动深拷贝','不能，只限制列表结构修改','能，只要列表来自 HashMap'],correct:1,explanation:'元素引用仍然指向原对象；集合的不可修改性与元素不可变性是不同问题。'},
      {q:'需要经常按工单 ID 查询，优先考虑什么？',options:['每次排序全部数据','HashMap<Long, Ticket>','只保存打印后的字符串'],correct:1,explanation:'键值映射直接表达按 ID 查询的需求。'}
    ]);

  add('04', '3', 'Maven、测试与调试：让错误稳定重现', 75,
    '测试不是检查代码有没有执行，而是证明关键行为在成功、失败和边界输入下符合约定。先写你真正在意的业务结果。',
    [
      ['构建流程', 'Maven 根据 pom.xml 管理依赖并执行构建生命周期。业务源码放 src/main/java，测试放 src/test/java。mvn test 运行测试，mvn package 还会打包；若项目提供 Maven Wrapper，Windows 使用 .\\mvnw.cmd test。不要把“成功下载依赖”当作构建成功，检查退出码和测试摘要。'],
      ['测试边界', '对标题规范化至少覆盖 null、纯空白、100 和 101 个 ASCII 字符。对工单状态验证第二次 close 被拒绝。测试命名表达业务含义，Arrange 准备输入、Act 执行、Assert 检查结果。不要为了覆盖率把每个 getter 都测一遍，也不要把被测函数复制到测试里重新计算同一个错误答案。'],
      ['从证据排错', '读异常类型、第一处属于自己代码的堆栈和最内层 cause。设置断点观察进入方法前后的状态。日志放 requestId、任务 ID 和操作结果，避免输出密码、token 与完整私人文档。单元测试可替换外部服务，集成测试再验证真实 SQL 与事务，二者回答的问题不同。']
    ],
    'JUnit 的断言与 pytest 的 assert 用途相似；注解标记测试方法。可测试设计往往来自显式依赖，而不是引入尽可能多的 mock。',
    {lang:'java',text:'import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass TitleTest {\n    @Test void trimsOuterWhitespace() {\n        assertEquals("故障", Titles.normalizeTitle("  故障  "));\n    }\n    @Test void rejectsBlankTitle() {\n        assertThrows(IllegalArgumentException.class,\n            () -> Titles.normalizeTitle("   "));\n    }\n}',explain:'这是测试片段，需要把第 1 课函数放进 Titles 类并配置 JUnit 依赖。下方 exercises/core 提供不依赖 Maven 的第一组可运行练习，先运行它建立反馈循环。'},
    '运行仓库 exercises/core 的练习检查器，保留第一次失败信息。实现后再运行，并为重复关闭工单增加一个检查。',
    ['先读 exercises/core/README.md，确认在哪个目录运行。','测试期望的是异常类型与业务状态，不是“没有报错就算通过”。','主动把正确实现改错一次，确认检查器会失败，然后恢复。'],
    '有效验证应能发现一类真实错误。例如把标题校验删除后，空白标题测试必须失败。不能只运行正常输入就标记本课通过。',
    ['能重现至少一个失败用例','修复后检查通过','能说明单元测试没有验证到哪些数据库或网络行为'],
    [
      {q:'测试成功的合理含义是什么？',options:['程序不会有任何 bug','被测场景符合当前断言','外部模型效果一定很好'],correct:1,explanation:'测试的结论受输入、断言和环境限制。'},
      {q:'要验证真实 SQL 的事务回滚，仅使用内存 mock 是否足够？',options:['足够，方法名相同即可','不够，需要真实事务环境的集成验证','只需检查注解存在'],correct:1,explanation:'mock 不会实际执行数据库事务；注解存在也不能证明代理和事务配置生效。'}
    ]);

  add('05', '4', 'Spring 与依赖注入：从手动组装到容器管理', 60,
    'Spring 先看成负责组装对象的容器。理解这一步，再读注解才不会变成“加上就能跑”的记忆题。',
    [
      ['手动注入已经是依赖注入', 'new TicketService(repository) 由调用者提供仓库，服务本身不负责选择具体实现。Spring 容器负责创建对象、查找依赖并调用构造器。被容器管理的对象称为 Bean。@Service、@Repository、@Component 标记组件；包扫描范围之外的类不会仅因加了注解就自动出现。'],
      ['生命周期与共享状态', '常见 Spring Bean 默认是 singleton，即同一个容器中复用一个实例。它不意味着 JVM 全局只有一个，也不保证线程安全。把“当前用户”存在单例 Service 字段里会串请求；请求数据应通过参数或合适的请求上下文传入。服务可以共享无状态行为，但对共享可变数据必须设计并发控制。'],
      ['先保持边界清晰', 'Controller 接收 HTTP，Service 执行业务，Repository 存取数据。不是每个函数都必须穿越三层，但事务与业务规则不要散落在控制器里。构造器注入让必需依赖明确，也让没有 Spring 的单元测试容易构造服务。如果出现循环依赖，先检查职责拆分，不要直接用延迟注入掩盖设计问题。']
    ],
    'FastAPI Depends 与 Spring 注入都能提供依赖，但缓存、作用域和对象生命周期不能直接等同。先明确“谁创建、共享多久、谁关闭资源”。',
    {lang:'java',text:'@Service\nclass TicketService {\n    private final TicketRepository repository;\n    TicketService(TicketRepository repository) {\n        this.repository = repository;\n    }\n    Ticket get(long id) {\n        return repository.findById(id)\n            .orElseThrow(() -> new TicketNotFound(id));\n    }\n}',explain:'这是 Spring 项目中的示意片段，需要对应接口与异常类。只有一个构造器时可以省略 @Autowired。final 表示字段引用不重新赋值，不会自动使 repository 对象线程安全。'},
    '画出 Controller → Service → Repository 的依赖，手动 new 一次，再用容器注入。找出下面设计的问题：单例 Service 用 currentUserId 字段保存每次请求的用户。',
    ['分别想象用户 A 与 B 的请求交错执行。','不要让服务字段承担当前请求身份。','把可信的用户 ID 作为方法参数传入，并在数据访问时参与权限条件。'],
    'A 设置 currentUserId 后，B 可能覆盖它，导致 A 后续使用 B 的身份。即使没有异常也会造成数据泄露。默认单例不是问题，错误共享请求状态才是问题。',
    ['能手动构造服务并测试','能解释 Bean 的作用域','没有在单例字段保存当前请求数据'],
    [
      {q:'Spring 默认单例 Service 自动线程安全吗？',options:['是，容器负责全部同步','不是，共享可变状态仍需控制','只要字段都是 private 就安全'],correct:1,explanation:'作用域只描述对象复用范围，不负责保证业务操作原子性。'},
      {q:'构造器注入的核心作用是什么？',options:['隐藏全部依赖','明确依赖并交由外部提供','自动让所有方法变成异步'],correct:1,explanation:'它明确对象成立所需要的合作对象。'}
    ]);

  add('06', '5', 'HTTP、DTO 与参数校验：写清接口契约', 90,
    '一个接口不只是返回 JSON，还要让调用者知道哪里成功、哪里失败、怎样修正。用 DTO 隔离外部输入和内部实体。',
    [
      ['请求进入业务前发生什么', '客户端发送方法、路径、请求头和请求体；框架把 JSON 转成 DTO，再执行校验并调用控制器。创建可以约定返回 201，参数非法返回 400，不存在返回 404，状态或版本冲突返回 409。状态码与响应体共同构成契约。DTO 不直接暴露数据库全部字段，可避免用户提交 ownerId、管理员标志等不该自行修改的数据。'],
      ['校验分两层', '@NotBlank 检查字段格式；“工单是否属于当前用户”“已关闭工单能否再关闭”是业务规则，不能只依赖 DTO 注解。引入 validation 依赖并在 @RequestBody 参数上使用 @Valid 才能触发相应校验。不要把任意 IllegalArgumentException 全部映射为用户错误，因为它也可能来自程序内部缺陷；使用明确的业务异常类型。'],
      ['异常与演进', '统一异常处理返回稳定的错误码、可理解的信息与 requestId；完整堆栈只记在服务端。添加分页上限避免无限读取，排序字段用白名单。下面片段演示控制器与 DTO，省略了实体、服务与 import，不是复制一个文件就能启动的完整工程。']
    ],
    'DTO 可类比 Pydantic 模型，但 Java 的 record、Jakarta Validation 与 Spring MVC 各负责不同工作；不是写了注解就自动把所有业务规则验证完。',
    {lang:'java',text:'record CreateTicketRequest(@NotBlank @Size(max = 100) String title) {}\nrecord TicketView(long id, String title, String status) {}\n\n@RestController\n@RequestMapping("/api/tickets")\nclass TicketController {\n    private final TicketService service;\n    TicketController(TicketService service) { this.service = service; }\n    @PostMapping\n    ResponseEntity<TicketView> create(\n            @Valid @RequestBody CreateTicketRequest request) {\n        TicketView created = service.create(request.title());\n        return ResponseEntity.created(\n            URI.create("/api/tickets/" + created.id())).body(created);\n    }\n}',explain:'@Size 的字符串长度不等于所有语言下的可见字数。本课先采用与第 1 课一致的 UTF-16 长度约定。实际鉴权与 ownerId 获取在第 9 课补充。'},
    '定义创建、查询、关闭工单三个接口。写出正常响应及空标题、缺失工单、重复关闭三种失败响应。再解释为什么客户端不能自行决定 ownerId。',
    ['先用一张表写下路径、输入、成功状态和失败状态。','把格式校验与业务状态冲突分开。','ownerId 来自验证后的登录身份，不是请求体中声称的身份。'],
    '一种合理契约：POST 创建返回 201，GET 查询返回 200/404，关闭操作返回 200 或 409。具体设计可不同，但不能业务失败仍返回假成功。接入登录后必须校验资源归属。',
    ['所有失败场景有明确契约','DTO 不开放敏感字段','通过实际 HTTP 请求验证状态码与响应体'],
    [
      {q:'@NotBlank 足以证明用户有权关闭工单吗？',options:['足够，校验通过就是可信请求','不够，它只检查字符串格式','只要用 record 就足够'],correct:1,explanation:'权限与业务状态必须在可信身份和数据上判断。'},
      {q:'重复关闭被约定为状态冲突，哪个响应更清楚？',options:['200 且 success=true','409 并返回明确业务错误码','只在服务端打印错误'],correct:1,explanation:'调用者需要能够区分成功与冲突，才能采取相应行为。'}
    ]);

  add('07', '6', 'SQL 与 MyBatis：先保证查询正确，再谈索引', 90,
    '把工单放进数据库后，数据会跨进程、跨请求保存。正确的数据约束比应用里的一次 if 判断更可靠。',
    [
      ['最小表设计', 'ticket 表至少有 id、owner_id、title、status、version、created_at。NOT NULL、主键和唯一约束表达数据库层不允许破坏的规则。request_id 若用于幂等，应与调用者范围一起形成唯一约束。不要先用 SELECT 查重再 INSERT 就认为不会重复：两个请求可能同时查到不存在。'],
      ['SQL 参数绑定', 'MyBatis 的 #{id} 通常生成预编译参数，不能把输入当作 SQL 结构执行；${} 是文本替换，外部输入直接放进去有注入风险。ORDER BY 的列名不能像普通值一样随意参数绑定，先把用户选项映射为固定白名单。Mapper 返回实体后，服务仍要按权限筛选，不能查到就返回。'],
      ['索引从查询出发', '常见查询是 WHERE owner_id=? AND status=? ORDER BY id LIMIT ?，可以尝试联合索引(owner_id,status,id)，再用 EXPLAIN 和实际数据验证。索引增加写入和存储成本，不是越多越好。无 ORDER BY 的分页没有可靠顺序；大 OFFSET 可能昂贵，后续可用最后一个 id 做游标分页。']
    ],
    '如果你在 Python 中使用 ORM，也仍要理解实际 SQL。Java 换了框架并不会改变数据库约束、事务和索引的原理。',
    {lang:'sql',text:'CREATE TABLE ticket (\n  id BIGINT PRIMARY KEY,\n  owner_id BIGINT NOT NULL,\n  title VARCHAR(200) NOT NULL,\n  status VARCHAR(20) NOT NULL,\n  version BIGINT NOT NULL DEFAULT 0,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\nCREATE INDEX idx_ticket_owner_status_id\n  ON ticket(owner_id, status, id);\n\nSELECT id, title, status, version\nFROM ticket\nWHERE owner_id = ? AND status = ?\nORDER BY id\nLIMIT ?;',explain:'这是 MySQL 风格练习 SQL，ID 生成由调用方暂时提供；并未承诺 VARCHAR 的数据库字符语义与 Java length 完全一致。MyBatis XML 中将值位置的 ? 写为 #{ownerId} 等参数表达式。'},
    '写出按当前用户查询工单的 Mapper；插入 1000 条测试数据，比较增加索引前后的执行计划。验证另一个用户的工单不出现在结果中。',
    ['先确认查询结果，再检查性能。','用户输入一律按值绑定；动态列名只允许固定映射。','记录 rows、访问方式与使用的索引，数据很少时优化器不选索引也可能合理。'],
    'WHERE owner_id=#{ownerId} AND status=#{status} ORDER BY id LIMIT #{limit} 是一种形态。ownerId 必须来自可信身份，limit 由服务校验上限。不要把单次运行耗时下降直接当作索引的稳定收益。',
    ['缺失字段被数据库约束拒绝','用户隔离查询正确','记录真实执行计划与数据规模'],
    [
      {q:'外部传入的标题应怎样传给 MyBatis 查询？',options:['用 ${title} 拼接','用 #{title} 绑定值','先删除所有空格再拼接'],correct:1,explanation:'预编译参数把值与 SQL 结构分开；手动删字符不是可靠注入防护。'},
      {q:'先 SELECT 发现没有，再 INSERT，能保证并发不重复吗？',options:['能','不能，还需要数据库唯一约束等并发机制','只有 Java 能保证'],correct:1,explanation:'两个请求可能同时通过查询，数据库约束才负责最终竞争裁决。'}
    ]);

  add('08', '7', '事务与乐观锁：两次写入必须一起成功', 90,
    '创建工单和写操作记录是一个业务动作。今天用故意制造的失败，检验事务真实生效，而不是只检查代码里有没有注解。',
    [
      ['本地事务的边界', '同一事务内的数据库操作可以共同提交或回滚。它不会撤回已经发出的邮件或已经成功的 HTTP 工具调用。长时间持有事务等待模型会占用数据库连接和锁，放大故障。先短事务保存任务，再由工作者执行外部操作，最后短事务记录结果，是后续可演进的方向。'],
      ['Spring 事务为什么可能不生效', '常见代理模式依赖调用经过容器代理：同一对象内部 this 调用另一个带事务注解的方法不会额外经过代理。默认回滚规则通常覆盖 RuntimeException 和 Error，受检异常要按业务明确配置。异常若被吞掉并正常返回，事务可能提交。这里假定未额外修改全局回滚策略。'],
      ['乐观锁防止悄悄覆盖', '客户端读取 version=3，更新时执行 WHERE id=? AND version=3，同时把 version 加一。影响行数为 0 表示记录不存在或版本已变化，服务应区分并返回适当结果。version 不是自动魔法，必须真的出现在更新条件里。遇到冲突应重新读取并判断，不应无条件覆盖重试。']
    ],
    '与 Python 数据库事务类似，关键是连接与事务管理范围，而不是语言。@Transactional 可以类比声明一个执行边界，但必须有实际基础设施执行它。',
    {lang:'sql',text:'UPDATE ticket\nSET status = ?, version = version + 1\nWHERE id = ? AND owner_id = ? AND version = ?;\n-- 应用检查受影响行数：1 表示更新成功，0 表示未满足条件。',explain:'权限条件、ID 与版本一起参与更新，避免检查后被并发修改。Java Service 的事务应同时覆盖工单修改与事件写入。'},
    '写一个通过 Spring Bean 调用的事务方法，先插入 ticket，再插入 ticket_event。第二步主动抛运行时异常；在方法结束后用独立查询确认两表均未留下本次数据。再模拟两个 version 相同的更新。',
    ['不要只在带自动回滚的测试事务里观察，否则可能掩盖服务事务缺失。','从容器获取服务，并在测试事务外调用；失败后另开查询检查。','两个更新使用相同旧版本，第一个成功后第二个应影响 0 行。'],
    '观察点是提交后的数据库状态。一次成功应有两条关联记录；中途失败应都没有。版本冲突不能当成功。远程副作用需要幂等与补偿等独立机制。',
    ['真实数据库验证中途失败回滚','验证调用确实经过代理','并发修改有一方得到明确冲突'],
    [
      {q:'同对象 this 调用带 @Transactional 的方法，默认代理模式一定开启新事务吗？',options:['一定','不一定，该调用不经过代理','只看方法名称'],correct:1,explanation:'自调用绕过代理；应检查实际调用边界与已有事务。'},
      {q:'事务回滚能自动撤销已成功的远程建单 HTTP 请求吗？',options:['能，只要在同一个 Java 方法里','不能，本地数据库事务不控制远程副作用','换 Redis 就能'],correct:1,explanation:'跨系统行为需要明确的幂等、状态协调或补偿策略。'}
    ]);

  add('09', '8', '认证与授权：登录了，也不一定能访问', 75,
    '最危险的一类业务错误是“请求合法、对象存在，但不属于这个用户”。先把资源归属验证做好，再优化界面体验。',
    [
      ['身份和权限是两个问题', '认证回答“你是谁”，授权回答“你能对哪个资源做什么”。前端传来的 userId 不可信。服务应从已验证的会话或令牌得到主体，再根据主体、资源和动作做判断。登录成功只能证明身份，不意味着可以读取所有知识库。'],
      ['从入口到数据层', 'Spring Security 可以控制 URL 访问与认证流程，但 require authenticated 只要求登录，不能替代对象归属判断。查询使用 id 与 owner_id，或显式检查知识库成员关系。任务结果、下载链接、文档检索范围都要遵循同一权限规则，不能只保护管理页面。'],
      ['选一种清晰的学习方案', '第一版可以采用框架支持的会话登录：密码使用成熟 PasswordEncoder，浏览器请求携带会话；Cookie 应有适当属性，涉及 Cookie 身份的写操作保留 CSRF 防护。若采用 Bearer token，再单独理解过期、签名验证和撤销。CORS 只控制浏览器跨源读取行为，不是身份认证。不要为跑通请求一键关闭全部保护。']
    ],
    'FastAPI 的依赖函数和 Java 的安全上下文都可提供已验证身份；资源授权仍是业务责任。把 ownerId 放在请求体里不会让它自动可信。',
    {lang:'java',text:'TicketView getForUser(long ticketId, long authenticatedUserId) {\n    return repository.findByIdAndOwnerId(ticketId, authenticatedUserId)\n        .map(TicketView::from)\n        .orElseThrow(TicketNotFound::new);\n}',explain:'这是业务片段。authenticatedUserId 由服务端认证流程提供。返回 404 可统一隐藏不存在与无权访问的差异；也可采用明确的 403 策略，但契约应一致。'},
    '创建用户 A 和 B 各一个知识库。用 A 的会话尝试读取 B 的知识库、任务结果与文档下载，再直接请求 Python 检索接口，检查是否也有服务端授权边界。',
    ['先列出所有能接触数据的路径，而不是只测一个页面。','Java 验证后传递可信检索范围，Python 不能接受任意客户端伪造的范围。','对内部服务限制入口，并验证服务身份与传递的授权上下文；不要把内网当作唯一保护。'],
    '每个数据入口都应受控。修改 URL、请求体或直接调用内部接口都不应扩大权限；检索前限制可访问文档集合。仅生成后过滤答案已经太晚。',
    ['A 无法访问 B 的知识库与任务','权限由服务端主体决定','保留认证、CSRF 与服务间身份的明确方案'],
    [
      {q:'接口要求登录，就能防止用户读取别人的工单吗？',options:['能','不能，还需资源级授权','只要 ID 难猜就能'],correct:1,explanation:'身份认证与对象授权不同，随机 ID 也不能替代授权。'},
      {q:'CORS 是服务端身份认证机制吗？',options:['是','不是，它主要约束浏览器跨源访问','是，只要 Origin 写正确'],correct:1,explanation:'非浏览器客户端不受浏览器 CORS 规则约束；服务端仍必须认证和授权。'}
    ]);

  add('10', '8', 'Redis 缓存：先定义失效和故障行为', 60,
    '缓存是数据库之外的一份加速副本。今天明确缓存失效、数据更新和 Redis 故障时发生什么，避免把“接上 Redis”当作性能完成。',
    [
      ['读路径与更新路径', '常见 cache-aside：先读缓存，未命中查数据库，再写入带 TTL 的缓存。更新通常先提交数据库，再删除相关缓存。并发下仍可能发生旧读取回填，因此不能声称删除缓存实现了强一致；对不能容忍旧值的场景，考虑绕过缓存、版本校验或更强的协调机制。'],
      ['键和值都需要契约', '键含实体 ID 与必要的租户范围，序列化值有版本；TTL 控制旧值最长保留的一个因素，但还要考虑回填与延迟。不存在的对象可短暂缓存空结果，减少穿透，且不能把无权限和不存在随意混成全局缓存。关键权限第一版每次查可信来源，不把用户 A 的授权结果缓存给用户 B。'],
      ['故障时有界降级', 'Redis 超时应快速失败；可回源数据库，但必须限流，避免所有流量压垮数据库。缓存击穿是热点失效后同时回源，可通过受控单飞、互斥加载等方式缓解；加入 TTL 抖动减少批量同时过期。先做观测，记录命中率、回源量与延迟，别盲目引入复杂锁。']
    ],
    'Redis 不是 Java 专属；你现有 Python 服务同样需要处理缓存一致性。这里练习的是数据副本与故障边界，而不只是客户端调用。',
    {lang:'text',text:'读取元信息：\n1. 验证用户对知识库的权限\n2. 用 kb:meta:v1:{id} 查非敏感元信息缓存\n3. 未命中则查数据库，写入有限 TTL\n4. 返回 DTO\n\n更新元信息：\n1. 数据库事务提交\n2. 删除对应缓存；失败时记录并安排重试\n3. 对强一致读取不要依赖这个缓存',explain:'这是流程示意，不是 Redis 执行脚本。权限判定不依赖这个共享元信息缓存；重试失效需要持久化或明确的可靠处理方案。'},
    '给知识库名称查询增加缓存。记录冷读、热读、改名后读和 Redis 不可用四种行为。主动复现“旧查询在改名后回填缓存”的竞态，并说明你接受的陈旧范围。',
    ['不要只测连续读取同一个值。','用暂停或断点让旧查询在数据库更新之后才写缓存。','第一版可让更新后的关键读取绕过缓存，并记录需要后续解决的一致性限制。'],
    '回填竞态说明 cache-aside 不是强一致。验收应明确可接受陈旧与失败行为，不能只声称“删缓存所以总是最新”。',
    ['四种行为有实际记录','缓存不承担唯一权限真相源','知道回填竞态与回源压力的限制'],
    [
      {q:'更新数据库再删缓存，是否绝对消除了旧值？',options:['是','否，可能发生旧查询回填','只要 TTL 一小时就能'],correct:1,explanation:'并发操作的顺序可能让旧查询在删除之后写入旧值。'},
      {q:'Redis 故障时所有请求无上限回源，主要风险是什么？',options:['数据库被流量压垮','Java 自动丢失类型','HTTP 变成 UDP'],correct:0,explanation:'降级也需要超时、并发限制和容量规划。'}
    ]);

  add('11', '9', '调用 Python：超时不是取消，也不证明失败', 75,
    'AI 调用慢且可能失败。把“发一个 HTTP 请求”升级为有时间预算、有身份、有可观测性的服务协作。',
    [
      ['区分三种时间', '连接超时限制建立连接的等待；请求超时限制一次调用的等待范围；任务业务截止时间限制任务还值得执行多久。具体客户端的响应体、流式读取超时语义要单独确认。给每个调用设置合理预算，记录排队、连接和下游执行耗时，不能只看总耗时。'],
      ['未知结果要显式表达', 'Java 超时只说明自己没在规定时间拿到结果；Python 可能尚未执行，也可能已执行成功。取消本地 Future 也不保证远程停止。对有副作用操作，下一步应查询任务状态或按相同幂等键重试，不能换一个新键重复执行。对不确定结果不要伪装成“确定未执行”。'],
      ['协议先行', '定义 requestId、taskId、调用者范围、状态和错误分类。短请求可同步返回；耗时任务先受理返回 taskId，再查询或订阅状态。服务间身份不要依赖用户可伪造的头；密钥放环境配置，并明确下游怎样校验。日志用 requestId 串联，错误信息不含密钥和完整提示词。']
    ],
    '可以对照 Python httpx 的连接与请求超时，但各客户端的细分选项不同。不要把一个 timeout 数字当成对所有阶段和远程生命周期的完整控制。',
    {lang:'java',text:'HttpClient client = HttpClient.newBuilder()\n    .connectTimeout(Duration.ofSeconds(2))\n    .build();\nHttpRequest request = HttpRequest.newBuilder(\n        URI.create("http://localhost:8000/health"))\n    .timeout(Duration.ofSeconds(5))\n    .GET().build();\nHttpResponse<String> response = client.send(\n    request, HttpResponse.BodyHandlers.ofString());\nif (response.statusCode() != 200) {\n    throw new IllegalStateException("AI服务状态异常");\n}',explain:'JDK HTTP 客户端片段，需要 java.net.http、java.net.URI、java.time.Duration 的 import；send 还需处理 IOException 和 InterruptedException。客户端应复用，处理中断时保留中断语义。本片段只做 health GET，不包含完整鉴权或任务协议。'},
    '写一个 Python 模拟接口，可选择立即返回、延迟 10 秒、返回 503。让 Java 对每种情况记录 requestId、耗时与错误分类，再模拟服务器执行成功但客户端收不到响应。',
    ['先把不依赖模型的模拟接口跑通。','检查异常类型和 HTTP 状态码，不要都转成“网络错误”。','最后一种场景需要服务端任务记录，客户端仅凭超时无法判断实际结果。'],
    '503、连接失败与请求超时是不同现象。对结果未知应保留可查询标识；若捕获 InterruptedException，一般应恢复线程中断标志或向上传播，而非静默吞掉。',
    ['连接与请求有超时','三种故障分类明确','能解释客户端超时后的远程结果为何未知'],
    [
      {q:'Java 等待超时，能证明 Python 没有创建任务吗？',options:['能','不能，可能已成功但响应丢失','只要是 POST 就能'],correct:1,explanation:'传输失败与业务执行结果不是一回事。'},
      {q:'对创建任务超时，优先采用哪种恢复思路？',options:['换新 requestId 无限重试','查询原任务，或按相同幂等键重试','直接向用户声称没有执行'],correct:1,explanation:'恢复必须关联原操作，避免重复副作用。'}
    ]);

  add('12', '10', '幂等与状态机：让重复请求得到一致结果', 90,
    '网络重试不可避免。目标不是幻想每个请求只会到达一次，而是确保同一个业务意图的重复到达不会制造多份结果。',
    [
      ['幂等键的范围', '将主体范围与 requestId 建联合唯一约束，保存请求指纹、taskId、状态和结果引用。相同键相同请求返回原任务；相同键不同请求拒绝冲突。记录不能在业务副作用完成之前过早删除。先查再写依然有竞争，使用数据库约束裁决，并在唯一冲突后读取已有任务。'],
      ['状态转换也会竞争', '定义 PENDING→RUNNING→SUCCEEDED/FAILED；取消可以先进入 CANCEL_REQUESTED，等工作者确认才转 CANCELLED。状态更新需带旧状态条件，防止迟到结果把已结束任务覆盖。若业务选择“成功优先”，也要明确与取消之间的裁决规则。重启后 RUNNING 任务不能永远悬挂，可设计租约、心跳与超时接管。'],
      ['持久化任务与真实副作用', '把任务记录与待发送事件放同一数据库事务可以避免“写成功但消息没发”的窗口，工作者通过 outbox 派发并重试。仍要让接收端按相同业务键去重；outbox 本身不等于全链路恰好一次。涉及外部工具时还需要接收端支持幂等或人工核对未知结果。']
    ],
    '这些原理与 LangGraph 状态恢复有关，但框架保存 checkpoint 并不会自动让外部建单操作幂等。恢复执行与副作用去重必须一起设计。',
    {lang:'sql',text:'CREATE TABLE ai_task (\n  id BIGINT PRIMARY KEY,\n  owner_id BIGINT NOT NULL,\n  request_id VARCHAR(100) NOT NULL,\n  payload_hash VARCHAR(64) NOT NULL,\n  status VARCHAR(30) NOT NULL,\n  UNIQUE (owner_id, request_id)\n);\n\nUPDATE ai_task SET status = \'RUNNING\'\nWHERE id = ? AND status = \'PENDING\';',explain:'影响行数为 1 才获得本次启动资格；0 行可能已被其他工作者启动。这里只演示状态竞争，完整实现还需要任务内容、结果、租约与时间字段。'},
    '同一 requestId 连续提交两次，再并发提交两次，均应返回同一 taskId。用相同键修改请求内容，应返回冲突。重启工作者后检查未完成任务如何处理。',
    ['把数据表唯一约束放在第一位，而不是只使用内存 Set。','保存规范化后的请求摘要；不要因 JSON 字段顺序不同误判，先定义规范化规则。','画出崩溃窗口：记录前、记录后发送前、执行后写结果前。'],
    '验收需要覆盖并发和崩溃，而不仅是顺序重复。对执行后写结果前崩溃，若下游不支持去重，不能承诺自动恢复就一定不会重复。',
    ['顺序与并发重复均复用任务','相同键不同内容明确拒绝','记录每个崩溃窗口的恢复策略'],
    [
      {q:'相同 requestId 携带不同请求内容，应怎样处理？',options:['随便复用旧结果','拒绝冲突并说明原因','再生成一个任务而不告知'],correct:1,explanation:'同一幂等键必须绑定同一业务意图。'},
      {q:'有了 outbox，就能无条件保证远程副作用恰好一次吗？',options:['能','不能，派发重试仍要求接收端去重','只要改为 Go 就能'],correct:1,explanation:'outbox 解决本地记录与待发送事件的一致性，不能消除所有跨系统重复执行窗口。'}
    ]);

  add('13', '10', '流式响应与 Agent 工具：处理断连和副作用', 75,
    '流式输出让用户更早看到进展，但不会自动缩短任务总耗时。工具调用也不是模型说执行就能不加限制地执行。',
    [
      ['SSE 的消息边界', 'SSE 使用 text/event-stream，事件以空行分隔，可带 event、id 与 data 字段。网络读取的一次 chunk 不等于一个完整事件，JSON 可能跨 chunk 分割；不能每收到一块字节就立即 JSON.parse。要缓冲到完整事件边界，再解析。原生 EventSource 通常使用 GET 且不能任意自定义 Authorization 头；鉴权方式要与客户端选择相匹配。'],
      ['断连与背压', '浏览器关闭后，Java 的连接应清理，下游是否取消按产品策略明确。若任务继续后台执行，保存 taskId 供用户重连查询；若取消，向工作者发送取消请求并等待确认。慢客户端可能堆积缓冲，需要上限与清理策略。不要为每个 token 新建线程或把所有输出无限存进内存。'],
      ['工具参数不是可信指令', '模型输出必须经 schema、类型、范围和权限校验。查询工具与写入工具分开，建单等副作用先展示计划并由用户确认；用户确认也不替代服务端权限。工具执行沿用幂等键，记录工具名称、时间和结果摘要，设置步数与成本上限。Agent 的说明文本不能作为“执行成功”的唯一证据。']
    ],
    'FastAPI 流式生成器与 Java 转发器都需要处理取消和资源释放。Python 的 yield 次数、Java 的读取块和浏览器收到的事件数量不一定一一对应。',
    {lang:'text',text:'event: progress\nid: 1\ndata: {"taskId":"t-1","stage":"retrieving"}\n\nevent: result\nid: 2\ndata: {"taskId":"t-1","answer":"建议检查配置"}\n\n',explain:'两个事件各以空行结束。id 若用于断线恢复，还需要服务端保存并正确重放事件，单有编号并不自动实现恢复。'},
    '把一个 SSE 事件人为拆成三个字节片段再解析，保证只在事件完整时输出。任务进行中关闭客户端，检查 Java 连接和下游任务是否符合你的取消策略。',
    ['把 transport chunk 和 application event 分开。','保留未完成缓冲，注意换行与 UTF-8 解码边界；真实实现优先使用成熟解析器。','为断连写一张表：释放哪些资源、远程继续还是取消、用户如何查最终结果。'],
    '解析必须跨 chunk 累积，文本解码也要支持流模式以免截断多字节字符。取消是一个有竞争的协议，不是把本地连接关掉就认定远程已经停下。',
    ['跨 chunk 事件解析正确','断连后没有无限缓冲或连接泄漏','写工具有校验、权限、确认与幂等'],
    [
      {q:'一次 HTTP 字节读取是否一定对应一个完整 SSE 事件？',options:['一定','不一定，需要按事件协议分帧','只要内容是 JSON 就一定'],correct:1,explanation:'传输块与应用消息边界不同。'},
      {q:'模型返回“工单创建成功”，可以直接视为成功吗？',options:['可以','不可以，应以实际工具结果与持久化状态为准','回答语气肯定就可以'],correct:1,explanation:'文本生成不等于副作用已经成功执行。'}
    ]);

  add('14', '11', '并发与 JVM：限制负载，再定位瓶颈', 90,
    '服务变慢时，先判断时间花在排队、计算、数据库还是模型。不要看到慢就加线程，看到内存高就盲目改 GC 参数。',
    [
      ['有界并发', '请求到达速度超过处理速度时会排队。无界队列推迟拒绝，却可能积累内存与不可接受的延迟。固定线程数、有限队列、明确拒绝策略与总超时共同构成容量边界。限流限制单位时间到达量，并发限制约束正在执行的数量；两者不同。虚拟线程降低部分阻塞线程成本，也不会让数据库和模型的容量无限增加。'],
      ['共享数据与原子性', 'volatile 保证相关可见性与顺序约束，但 count++ 是读、计算、写的复合动作，仍可能丢失更新。AtomicInteger.incrementAndGet 可以完成原子递增；跨多个字段的业务不变量还需要更完整的同步或数据库事务。并发集合只保证其规定的单个操作语义，get 后再 put 不会自动组成原子业务。'],
      ['诊断顺序', '先记录吞吐、错误率、P95、队列长度与下游耗时。CPU 高时看热点；大量线程等待连接池时检查数据库和连接泄漏；内存持续上涨时区分缓存、任务积压和真正泄漏。用 jcmd 的线程信息或 JFR 捕获证据。堆是对象分配的重要区域，栈保存调用帧等；本课不靠一句“对象全在堆上”解释全部 JVM 优化。']
    ],
    '不要直接套用 Python GIL 的结论。Java 多线程可并行执行，但共享状态竞争和外部资源容量依旧要控制。',
    {lang:'java',text:'ThreadPoolExecutor pool = new ThreadPoolExecutor(\n    4, 4, 0L, TimeUnit.MILLISECONDS,\n    new ArrayBlockingQueue<>(20),\n    new ThreadPoolExecutor.AbortPolicy());\ntry {\n    pool.execute(() -> performBoundedTask());\n} catch (RejectedExecutionException ex) {\n    // 映射为明确的过载响应，不能假装任务已受理。\n}',explain:'需要 java.util.concurrent 包及 performBoundedTask 实现。4 与 20 是实验参数，不是生产推荐。应用关闭时需要 shutdown，并处理未完成任务；阻塞调用仍要有自己的超时。'},
    '模拟每个任务耗时 2 秒，连续提交 100 个任务，观察执行、排队和拒绝数量。再比较 volatile int 与 AtomicInteger 的并发递增结果，不把偶然正确当作线程安全证明。',
    ['任务数要超过线程数和队列容量之和。','RejectedExecutionException 表示没有受理，应反馈而非记录成功。','使用 CountDownLatch 协调开始，等待全部任务结束后再检查总数。'],
    '在瞬时突发且任务未完成时，最多 4 个执行、20 个排队，其余可能拒绝；实际数量受提交时序影响。volatile 复合递增有竞争，即使某次结果正确也不能证明安全。',
    ['有界队列与拒绝行为可观察','能解释 volatile 与原子操作差异','诊断结论有线程或性能证据'],
    [
      {q:'volatile int count; 的 count++ 是否原子？',options:['是','不是','只要线程少于4个就是'],correct:1,explanation:'读取、计算和写入之间可能与其他线程交错。'},
      {q:'下游模型容量不变，持续增加线程一定提高吞吐吗？',options:['一定','不一定，可能只增加排队与资源压力','只要内存足够就一定'],correct:1,explanation:'瓶颈容量没有随线程数自动增长。'}
    ]);

  add('15', '12', '交付与复盘：让别人能启动，也能验证', 90,
    '最终成果不是一张成功截图，而是另一台电脑能复现运行、正常流程与故障行为，并知道系统仍有什么限制。',
    [
      ['部署是明确依赖', 'Java、Python、数据库、Redis 各有配置、端口和生命周期。容器里的 localhost 指向当前容器，Java 访问 Python 通常使用 Compose 服务名。启动顺序不等于应用已就绪，要有健康检查或重试；数据库使用数据卷，密钥由环境配置提供，仓库示例只有占位值。'],
      ['验收覆盖失败', '至少验证正常提问建单、越权访问、第二次写入失败回滚、同键重复请求、Python 超时、流式断连、重启后的未完成任务。模拟模型可以先稳定覆盖工程行为，真实模型再验证回答质量与工具决策。P95、错误率和完成率都需要说明样本、并发、硬件、模型和测量范围。'],
      ['口头解释决定是否掌握', '能从请求进入一路解释身份、校验、事务、AI 调用和结果返回，说明每个边界为何存在。把最难的故障写成“现象—假设—证据—修复—复验”。没有测量的提升不要写进简历。课程结束后再选 Spring AI 或消息队列，针对真实缺口补，而不是继续堆技术名词。']
    ],
    'Python 经验是你的优势。最终目标是让两种语言的服务围绕明确契约协作，而不是证明自己能用 Java 重写每一段 Python。',
    {lang:'yaml',text:'# Compose 网络内的配置示意，不是完整部署文件\nservices:\n  java-api:\n    environment:\n      AI_BASE_URL: http://python-ai:8000\n  python-ai:\n    environment:\n      MODEL_MODE: mock',explain:'实际还需要镜像或 build、端口、依赖、数据卷和健康检查等配置。这里用服务名解释容器网络，不伪装为开箱即用部署。'},
    '按 docs/project.md 完成最终验收；录制 3 分钟演示：正常任务、一次越权、一次超时恢复。写出尚未解决的两个限制和下一步优先级。',
    ['先在干净目录按 README 启动，暴露隐含本机依赖。','演示失败场景时同时展示响应与持久化结果。','不要求一次实现全部生产特性，但限制必须具体且真实。'],
    '合格交付包含启动步骤、测试命令、配置说明、失败恢复策略和实际限制。互动页的完成勾选是自评，不替代运行证据。',
    ['另一人可按说明启动','至少五类故障有证据','能独立讲清请求链路和两个技术取舍'],
    [
      {q:'Java 容器中 localhost:8000 默认指向哪里？',options:['Python 容器','当前 Java 容器本身','宿主机所有服务'],correct:1,explanation:'容器网络命名空间隔离，跨服务通常使用服务名与容器端口。'},
      {q:'互动页显示所有课程完成，能自动证明项目已经可用吗？',options:['能','不能，还需编程、运行与验收证据','测验超过80分就能'],correct:1,explanation:'概念测验和自评不能替代真实代码及系统行为验证。'}
    ]);

  const course = {version:1, title:'Java学习 · AI应用后端', lessons};
  if (typeof module !== 'undefined' && module.exports) module.exports = course;
  else root.JAVA_COURSE = course;
})(typeof window !== 'undefined' ? window : this);
