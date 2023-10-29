package reon.app.domain.member.service.impl;

import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.entity.Tier;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.member.service.MemberService;
import reon.app.domain.member.service.dto.BattleLogSaveDto;
import reon.app.domain.member.service.dto.MemberUpdateDto;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;
import reon.app.global.util.FileManger;
//import reon.app.global.util.FileManger;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private FileManger fileManger = new FileManger();
//    private final String imgPath = "https://storage.googleapis.com/reon-bucket/";
    private final Storage storage;
    private final MemberRepository memberRepository;

    @Override
    public String updateMember(MemberUpdateDto memberUpdateDto) {
        Member findMember = memberRepository.findById(memberUpdateDto.getLoginId()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        findMember.getMemberInfo().updateMemberInfo(memberUpdateDto);
        return findMember.getEmail();
    }
    @Override
    public void deleteRefreshToken(Long id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        findMember.deleteRefreshToken();
    }
    @Override
    public String updateProfileImg(MultipartFile profileImg, Long loginId) {
        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        if(findMember.getMemberInfo().getProfileImg() != null){
            fileManger.removeImgFile(findMember.getMemberInfo().getProfileImg(), storage);
        }
        String imgName = fileManger.updateImgFile(profileImg, storage);
        findMember.getMemberInfo().updateProfileImg(imgName);
        return findMember.getEmail();
    }
    @Override
    public String removeProfileImg(Long loginId) {
        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        if(findMember.getMemberInfo().getProfileImg() != null){
            fileManger.removeImgFile(findMember.getMemberInfo().getProfileImg(), storage);
//            removeImgFile(findMember.getMemberInfo().getProfileImg());
        }
        findMember.getMemberInfo().updateProfileImg(null);
        return findMember.getEmail();
    }
    @Override
    public String delete(Long loginId) {
        Member findMember = memberRepository.findById(loginId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        findMember.getMemberInfo().updateDeleted(1);

        return findMember.getEmail();
    }

    @Override
    public void updateBattleInfo(BattleLogSaveDto dto, int score) {
        Member member1 = memberRepository.findById(dto.getUser1Id()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        //총 스코어 갱신
        member1.getMemberBattleInfo().updateScore(score);
        member1.getMemberBattleInfo().updateTier();
        member1.getMemberBattleInfo().updateGameCnt(score);
    }

//    private void removeImgFile(String prevImg) {
//        Blob blob = storage.get(bucketName).get(prevImg);
//        boolean deleted = blob.delete();
//
//        if (deleted) {
//            log.info("이미지 삭제 성공: {}", blob);
//        } else {
//            log.info("이미지 삭제 실패: {}", blob);
//        }
//    }

//    public String updateImgFile(MultipartFile profileImg) {
//        log.info("Service entered");
//        String uuid = UUID.randomUUID().toString();
//        String ext = profileImg.getContentType();
//        log.info(uuid);
//        log.info(ext);
//        log.info(bucketName);

//        try {
//            storage.create(
//                    BlobInfo.newBuilder(bucketName, uuid)
//                            .setContentType(ext)
//                            .build(),
//                    profileImg.getInputStream());
//        } catch (IOException e) {
//            log.info(e.getMessage());
//            throw new RuntimeException(e);
//        }
//        log.info("이미지 저장 성공: {}", uuid);
//
//        return uuid;
//    }

















}
