<%@ page language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<html>

<head>

  <script>
    var i18n = {
      MemberAuth: '<spring:message code="MemberAuth"/>',

      memberAuth: {
        member: {
          memberNo: '<spring:message code="MemberAuth.Member.MemberNo"/>',
          name: '<spring:message code="MemberAuth.Member.Name"/>',
          isMember: '<spring:message code="MemberAuth.Member.IsMember"/>',
          isMember1: '<spring:message code="MemberAuth.Member.IsMember1"/>',
          isMember0: '<spring:message code="MemberAuth.Member.IsMember0"/>',
          isPending: '<spring:message code="MemberAuth.Member.IsPending"/>',
          isPending1: '<spring:message code="MemberAuth.Member.IsPending1"/>',
          isPending0: '<spring:message code="MemberAuth.Member.IsPending0"/>',
          isPending_1: '<spring:message code="MemberAuth.Member.IsPending-1"/>',
          status: '<spring:message code="MemberAuth.Member.Status"/>',
          status1: '<spring:message code="MemberAuth.Member.Status1"/>',
          status9: '<spring:message code="MemberAuth.Member.Status9"/>',
          status0: '<spring:message code="MemberAuth.Member.Status0"/>',
          changePassword: '<spring:message code="MemberAuth.Member.ChangePassword"/>',
          editGroup: '<spring:message code="MemberAuth.Member.EditGroup"/>',
          location: '<spring:message code="MemberAuth.Member.Location"/>',
        },
        memberGroup: {
          status: '<spring:message code="MemberAuth.MemberGroup.Status"/>',
          status1: '<spring:message code="MemberAuth.MemberGroup.Status1"/>',
          status0: '<spring:message code="MemberAuth.MemberGroup.Status0"/>',
          editGroup: '<spring:message code="MemberAuth.MemberGroup.editGroup"/>',
          selectMember: '<spring:message code="MemberAuth.MemberGroup.selectMember"/>',
        },
        function: {
          memberAuthMember: '<spring:message code="MemberAuth.Function.Member"/>',
          memberAuthMemberGroup: '<spring:message code="MemberAuth.Function.MemberGroup"/>',
          memberAuthModule: '<spring:message code="MemberAuth.Function.Module"/>',
          memberAuthFunction: '<spring:message code="MemberAuth.Function.Function"/>',
        }
      },

      ui: {
        message: {
          createSuccessMessage: '<spring:message code="UI.Message.CreateSuccessMessage"/>',
          updateSuccessMessage: '<spring:message code="UI.Message.UpdateSuccessMessage"/>',
          successMessageEnd: '<spring:message code="UI.Message.SuccessMessageEnd"/>',
          delConfirm: '<spring:message code="UI.Message.DelConfirm"/>',
          chooseItem: '<spring:message code="UI.Message.ChooseItem"/>',
          longitude: '<spring:message code="UI.Message.Longitude"/>',
          latitude: '<spring:message code="UI.Message.Latitude"/>',
          enter: '<spring:message code="UI.Message.Enter"/>',
          search: '<spring:message code="UI.Message.Search"/>',
          advancedSearch: '<spring:message code="UI.Message.AdvancedSearch"/>',
          preventSort: '<spring:message code="UI.Message.preventSort"/>',
        },

        btn: {
          allClear: '<spring:message code="UI.Btn.AllClear"/>',
          change: '<spring:message code="UI.Btn.Change"/>',
          edit: '<spring:message code="UI.Btn.Edit"/>',
          update: '<spring:message code="UI.Btn.Update"/>',
          cancel: '<spring:message code="UI.Btn.Cancel"/>',
          select: '<spring:message code="UI.Btn.Select"/>',
          close: '<spring:message code="UI.Btn.Close"/>',
          save: '<spring:message code="UI.Btn.Save"/>',
          back: '<spring:message code="UI.Btn.Back"/>',
          systemGenerator: '<spring:message code="UI.Btn.SystemGenerator"/>',
          letterVerification: '<spring:message code="UI.Btn.LetterVerification"/>',
          sentPasswordBtn: '<spring:message code="UI.Btn.SentPasswordBtn"/>',
          sendEmail: '<spring:message code="sendEmail"/>'
        },

        member: {
          memberCreator: '<spring:message code="UI.Member.MemberCreator"/>',
          memberModifier: '<spring:message code="UI.Member.MemberModifier"/>',
        }
      }
    }
  </script>
</head>

<body></body>

</html>
