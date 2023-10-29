package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.boot.context.properties.bind.DefaultValue;
import reon.app.domain.member.dto.req.MemberBattleInfoUpdateRequest;

import javax.persistence.*;


@Embeddable
@Getter
@NoArgsConstructor
@SuperBuilder
public class MemberBattleInfo {
    @Enumerated(EnumType.STRING)
    private Tier tier;//현재 티어
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int score;//누적 점수
    @Column(name = "game_cnt", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int gameCnt;//게임 수
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int win;//승리
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int lose;//패배


    //TODO 2023.08.03 : 게임 정책 정해진 후 수정 필요
    public boolean checkTierUpdate(int score, String tier){
        switch (tier){
            case "BRONZE":
                if(score > 1000){
                    return true;
                }else{
                    return false;
                }
            case "SILVER":
                if(score > 10000){
                    return true;
                }else{
                    return false;
                }
        }
        return false;
    }

//    public void updateTier(String tier){
//        switch (tier){
//            case "BRONZE":
//                this.tier = Tier.SILVER;
//                break;
//            case "SILVER":
//                this.tier = Tier.GOLD;
//                break;
//        }
//    }

    public void updateScore(int score){
        int newScore = this.score+score;
        if(newScore <= 0){
            this.score=0;
        }
        else{
            this.score=newScore;
        }
    }

    public void updateGameCnt(int score){
        this.gameCnt++;
        if(score>0){
            this.win++;
        }else if(score<0){
            this.lose++;
        }
    }

    public void updateTier(){
        switch (this.tier){
            case BRONZE:
                if(this.score >= 100){
                    this.tier = Tier.SILVER;
                    return;
                }
            case SILVER:
                if(this.score >= 1000){
                    this.tier = Tier.GOLD;
                    return;
                }else if(this.score<100){
                    this.tier = Tier.BRONZE;
                    return;
                }
            case GOLD:
                if(this.score<1000) {
                    this.tier = Tier.SILVER;
                }
        }
    }

    public void updateBattleInfo(MemberBattleInfoUpdateRequest memberBattleInfoUpdateRequest){
        this.score = memberBattleInfoUpdateRequest.getScore();
        this.gameCnt = memberBattleInfoUpdateRequest.getGameCnt();
        this.win = memberBattleInfoUpdateRequest.getWin();
        this.lose = memberBattleInfoUpdateRequest.getLose();
    }
}
