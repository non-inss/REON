//package reon.app.domain.notice.entity;

//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@SuperBuilder
//public class Comment extends BaseEntity {
//
//    @Id
//    @GeneratedValue
//    @Column(name="id")
//    private Long id;
//
////    TODO: 2023-07-25 post entity 생성 시 주석 해제 필요
////    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name ="action_id")
////    private Post post;
//
////    TODO: 2023-07-25 Member Entity 생성 시 주석 해제 필요
////    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name ="member_id")
////    private Member member;
//
//    @Column(name = "content", nullable = false, length = 100)
//    private String content;
//
//    @Column(name = "layer", nullable = false)
//    private int layer;
//
//    @Column(name = "order", nullable = false) // order -> "order by" 와 충돌 가능성 / 대체 가능 컬럼명 : sequence
//    private int order;
//
//    @Column(name = "group") // group -> "group by" 와 충돌 가능성 / 대체 가능 컬럼명 : parent_id
//    private Long group;
//
//
//}
