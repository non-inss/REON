package reon.app.domain.post.repository;

import java.util.List;

public interface PostLikeQueryRepository {
    List<Long> searchLikedPostByMemberId(Long memberId);

    public Boolean isLike(Long postId, Long memberId);

}
