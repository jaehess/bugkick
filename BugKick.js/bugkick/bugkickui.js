/*!
 * BugKick API widget UI
 *
 * Requires jQuery.
 *
 * @author Evgeniy `f0t0n` Naydenov
 * @author Alexey Kavshirko
 * @copyright BugKick
 */
(function(e,t){var n=t.bugkick;n.BugKickUI=function(){this.client=new n.Client;this.widget$=null;this.body$=e("body");this.dialog$=null;this.msgWnd$=null;this.overlay$=null};n.BugKickUI.Template={MAIN:n._url("bugkick/templates/main.html")};n.BugKickUI.Message={TICKET_SUBMIT_SUCCESS:"Your ticket has been submitted. Thank you!"};n.BugKickUI.prototype._getTemplate=function(t){var r=this;e.get(n.BugKickUI.Template.MAIN,function(e){t.call(r,e)})};n.BugKickUI.prototype.render=function(){this._getTemplate(function(t){n.page.includeCss(n._url("bugkick/css/style.css"));this.body$.append(t);this.widget$=e("#bugkick-feedback-widget");this.dialog$=e(".modal-window",this.widget$);this.msgWnd$=e(".message-window",this.widget$);this.overlay$=e(".overlay",this.widget$);this.initEventHandlers()})};n.BugKickUI.prototype.showDialog=function(){this.dialog$.show();this.overlay$.fadeTo(700,.7);this.updateDialogPosition();e("textarea",this.widget$).focus()};n.BugKickUI.prototype.hideDialog=function(){e(".overlay, .modal-window",this.widget$).hide()};n.BugKickUI.prototype.updateDialogPosition=function(){var r=e(t),i=[this.dialog$,this.msgWnd$],s,o;for(s=0;o=i[s++];){o.css({left:n.string.buildString(Math.round(r.width()/2-o.width()/2),"px"),top:n.string.buildString(Math.round(r.height()/2-o.height()/2),"px")})}};n.BugKickUI.prototype.initEventHandlers=function(){var n=this;this.widget$.on("click",".bugkick-feedback-button",function(){n.showDialog()}).on("submit","form",function(){return n.onFormSubmit()}).on("reset","form",function(){n.hideDialog();e(".error-summary",n.widget$).html("").hide();return true}).on("click",".overlay",function(){n.resetForm()}).on("keyup",function(e){if(e.keyCode==27){n.resetForm()}});e(t).on("resize",function(){n.updateDialogPosition()})};n.BugKickUI.prototype.resetForm=function(){this.msgWnd$.hide();e("form",this.widget$)[0].reset()};n.BugKickUI.prototype.showMessage=function(t){e(".text",this.msgWnd$).html(t);this.msgWnd$.show()};n.BugKickUI.prototype.hideMessage=function(){this.msgWnd$.hide()};n.BugKickUI.prototype.onFormSubmit=function(){var e=this;ticketEmail=this.widget$.find("form input.bugkick-feedback-email").val(),ticketText=this.widget$.find("form textarea").val(),ticketType=this.widget$.find("form select").val();this.client.createTicket(ticketText,ticketType,ticketEmail,function(t){e.onCreateTicketSuccess(t)},function(t){e.onCreateTicketError(t)});return false};n.BugKickUI.prototype.onCreateTicketSuccess=function(r){if(!!r.success){this.dialog$.hide();this.showMessage(n.BugKickUI.Message.TICKET_SUBMIT_SUCCESS);var i=this;t.setTimeout(function(){i.hideMessage();i.resetForm()},1500)}else if(!!r.error){e(".error-summary",this.widget$).html(r.error).show()}};n.BugKickUI.prototype.onCreateTicketError=function(e){this.resetForm()};t.onload=function(){var e=new n.BugKickUI;e.render()}})(this.jQuery,this)