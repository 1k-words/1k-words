<script lang="coffee">
  import {dropdown, checkbox, radio} from 'lexi'
  export default
    name: 'survey',
    components : {dropdown, checkbox, radio}
    data:()->
      formSubmitted : false
      submitSuccess : false
      showDetails:false
      metaData:{
        # Referral Site
        referalSite : {
          id: "477568040"
          val: this.$route.params.referrer
        }
      }
      questions: [
        {
          question : "Have you or a loved one left the LDS Church or gone inactive?"
          id:"1510120181"
          kind:"checks"
          answers:[
            {val:false, txt: "I have"}
            {val:false, txt: "An immediate family member has"}
            {val:false, txt: "A friend has"}
          ]
        },
        {
          question : "Have you cut ties with a loved one over differences in belief?"
          id:"320238776"
          kind:"checks"
          answers:[
            {val: false, txt: "I cut ties"}
            {val: false, txt: "They cut ties"}
            {val: false, txt: "Our relationship is still strong and we're figuring out the new normal"}
          ]
        }
        {
          question: "Do you feel like your loved ones who believe opposite of you, understand where you're coming from?"
          kind:"radio"
          id:"1325524876"
          val:"",
          answers:[
            "They don't listen but try to convince me of the rightness of their side",
            "We've had respectful conversations about our differences"
          ]
        },
        {
          question: "Would you be interested in watching this film?"
          kind:"radio"
          id:"1161766308"
          val:"",
          answers:[
            "Yes",
            "No",
            "Maybe"
          ]
        },
        {
          question : "Would you support this film?"
          id:"1549240214"
          kind:"checks"
          answers:[
            {val: false, txt: "Yes, I would watch this on a streaming service (netflix, amazon, etc)"}
            {val: false, txt: "Yes, I would watch this in the theatre"}
            {val: false, txt: "Yes, I would share this on social media"}
            {val: false, txt: "Yes, I would donate to a campaign to have this made"}
            {val: false, txt: "Yes, I would invest for a percentage of ownership of the film"}
            {val: false, txt: "No, I would not"}
          ]
        }
      ]

    methods:
      submitSurvey :()->
        return if this.$refs.spiderweb.value != ""
        @formSubmitted = true
        @$refs.hiddenForm.submit()

      surveySubmitComplete:()->
        return if !@formSubmitted
        @submitSuccess = true

      submitEmail : () ->
        return if this.$refs.spiderweb2.value != ""
        @$refs.emailForm.submit()

      # ------------------------------------ Helpers
      getParameterByName: (name)->
        match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));


</script>

<template lang="pug">
  .survey-page
    form.complete(ref="emailForm" v-if="submitSuccess" action="https://docs.google.com/forms/d/e/1FAIpQLScMGElzYPSxgF9pflI7VYqbO4CKLHNVkWqogtAEBT9wSzekgA/formResponse")
      .top
        .row
          .title Thank you!
          .blurb If you are interested in receiving (rare) updates as the film progresses submit your email address below.
          .blurb.never We will never share your email address with anyone!
        .row.form
          input.spider(name="spiderweb" ref="spiderweb2")
          input(type="hidden" name="entry.1504567568" v-model="$route.params.referrer")
          input(placeholder="email" name="entry.1506356406")
      .row.white
        div
        .question
          .info
            .submit(@click="submitEmail") Send me Updates


    .survey(v-if="!submitSuccess")
      .row
        .logo
          img(src="../assets/compiled/dark-logo.svg")
        .top-info
          .content
            .title Faith Crisis Film : Survey
            .sub Est. Completion Time : <span>1 minute</span>
            .blurb We are creating a film about a marriage where one spouse experiences a crushing crisis of faith and leaves the church permanently while the other remains. We seek to tell their story in such a way that the we feel love, empathy, and understanding for both spouses.
            .more(@click="showDetails=!showDetails")
              .cross(v-bind:class="{'close': showDetails }")
                img(src="../assets/compiled/cross.svg")
              span(v-if="!showDetails") Show More
              span(v-if="showDetails") Hide
            transition(name="fade")
              .blurb.full-details(v-if="showDetails" )
                p Most members of the church have loved ones who have experienced a crisis of faith and a loss of testimony. This heart-wrenching experience can shatter family relationships and often cause seemingly irreparable rifts.
                p I am telling the story of a couple who deeply love each other but find themselves in opposing camps when one of them leaves the LDS Church. Can their marriage survive such a devastating event? Should it?
                p This story is NOT anti-mormon, nor is it an anti-Intellectual.  In fact, controversial faith issues have little-to-zero presence in the the story. Rather, this is a story of relationships, of love, of finding understanding and being understood. It is a chance for the viewer, regardless of which “side” they find themselves on, to feel a pull to return to a place of love; to try understanding and empathy over fear and hatred. Ultimately to remember that seemingly insurmountable divisions should not destroy our most cherished relationships.


      .row(v-for="(question, i) in questions")
        .number {{`${i+1} of ${questions.length}`}}
        .question
          .info
            .txt {{question.question}}
            .answers
              checkbox(v-if="question.kind == 'checks'" v-for="(answer, key) in question.answers" v-model="answer.val" :key="key" )
                .label {{answer.txt}}
              radio.try(v-if="question.kind == 'radio'" v-for="(answer, key) in question.answers" v-model="question.val" :val="answer" :key="key") {{answer}}

      .row
        div
        .question
          .info
            .submit(@click="submitSurvey") Submit Answers

      iframe(id="hidden_iframe" name="hidden_iframe" @load="surveySubmitComplete" style="display:none")
      form(ref="hiddenForm" action="https://docs.google.com/forms/d/e/1FAIpQLSfXWdboGtiSjfApibLnZsUr4tRjnXQx7aepIcsCkALXeOYrIQ/formResponse" method="post" target="hidden_iframe")
        input.net(name="spiderweb" ref="spiderweb")
        //- Meta Data
        input(v-for="item in metaData" v-model="item.val" :name="`entry.${item.id}`")
        input(v-model="showDetails" name="entry.528084191")

        div(v-for="question in questions")
          //- Radio buttons
          div(v-if="question.kind == 'radio'")
            input(:name="`entry.${question.id}`" v-model="question.val" v-if="question.val != ''" )

          //- Checkboxes
          div(v-else)
            input(v-for="answer in question.answers" :name="`entry.${question.id}`" v-model="answer.txt" v-if="answer.val != false" )
</template>

<style lang="scss" >
  $garamond : "garamond-premier-pro-display";
  @mixin garamond {
    font-family: $garamond;
    letter-spacing: 0.02em;
  }
  * {transition: all 300ms; }

  .row                {

    //- Info Section
    .logo{justify-self:center;
      img{width:135px; display: none; }
    }
    .content        {max-width:650px; padding:20px 40px; font-style: italic; }
    .title          {font-size:30px; color:white; @include garamond; border-bottom:solid 1px #4E86B0; display: inline-block; font-style:normal; font-weight: 400; padding-bottom: 20px; }
    .sub            {font-size:16px; color:#1C2E3D; font-weight: 500; margin-top:15px;
      span          {color:white; font-style: italic; }
    }
    .blurb          {font-size:18px; color:#385F7D; line-height: 1.4; font-weight: 500; margin-top:35px; }
    .more           {font-size:16px; font-style:normal; color:#385F7D; font-weight: 600; display: inline-flex; margin-top:20px; cursor:pointer; padding:5px 0;
      .cross        {width:13px; padding-right:15px; margin-top:1px;
        img         {transition: transform 300ms; transform-origin: center;}
        &.close img {transform:rotate(45deg); }
      }
      &:hover       {color:white}
    }
    .top-info         {background:#73C1FF;
    }

    .number   {display: none}
    .question {background:#E6E7E8; padding:20px 0;
      .info   {padding: 0 40px;
        .txt  {font-size:20px; color:#3B3B38; margin-bottom:10px; padding-bottom:10px; border-bottom:solid 1px #BBBBBB;   }
      }
    }
    .answers  {display: flex; flex-direction: column;}
    .lexi     {margin-top:8px;
      .label  {font-size:15px; color:#777878; font-weight:400; padding-left:6px;  }
    }

    .submit   {height:55px; background:#73C1FF; display: inline-flex; align-items: center; justify-content: center; padding:0 40px; cursor:pointer; color:white; font-weight: bold; text-shadow: 0 1px 1px rgba(black,0.2);
      &:hover {background:#3698E6;}
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  form      {display: none;
    .spider {display: none; }
  }
  @media screen and (min-width:800px){
    .row                {display: grid; grid-template-columns: 240px auto;
      .logo             {padding-top:50px;
        img             {display: initial; }
      }
      .number           {display: block; font-size:21px; color:#777878; font-style: italic; justify-self: end; padding:45px 70px 0 0; }
      .question         {padding:40px 0;
        .info           {padding:0 0 0 70px; max-width:680px;
          .txt          {font-size:27px;   }
        }
      }
      .lexi     {margin-top:8px;
        .label  {font-size:21px; padding-left:15px;  }
      }
      .top-info         {padding-bottom: 60px;
        .content        {max-width:650px; padding:50px 0 0 70px; }
        .title          {font-size:60px; padding-bottom: 20px; }
        .sub            {font-size:26px;}
        .blurb          {font-size:25px;  }
      }
    }
  }

  // ------------------------------------ Complete

  .complete {display: initial;
    .top    { background:#73C1FF;}
    .row    {max-width:400px; padding:40px; display: flex; align-items: center; flex-direction: column; margin:0 auto;
      .logo {
        img {display: initial; width:80px; }
      }
      .title{width: 100%; }
      input{width: 100%; height:40px; font-size:15px; padding:0 15px; box-sizing: border-box;}
      &.form{padding-top:0;; }
      &.white{background: white; padding:10px 0; max-width:initial;
        .question{background: white}
        .info{background: white; }
      }
    }
  }


</style>
