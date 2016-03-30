

var site = siteService.getSite('reclutamiento-site').node.childByNamePath('documentLibrary');

function sendMailToGroup(wfPackage, mailTitle, wfDescription, wfPriority, groupName, subject, text, comments)
{
	
	
	logger.log('sendMailToGroup init..update.');
	var group = people.getGroup(groupName);
	var groupMembers = group.getChildren();

	for (var i = 0; i < groupMembers.length; i++)
	{
		var member = groupMembers[i];
		var memberEmail = member.properties['cm:email'];
		var memberUser = member.properties['cm:userName'];
		if (memberEmail != null || memberEmail != ''){
			sendMailToUser(wfPackage, true, mailTitle, wfDescription, wfPriority, memberEmail, subject, text, comments);
		} 
	}
}

function sendMailToUser(wfPackage, wfPooled, mailTitle, wfDescription, wfPriority, email, subject, text, comments)
{
	
	
	
	var template = site.childByNamePath('Configuracion/Plantillas/wf-email-ftl.htm');

	var wfMail = new Object();
	wfMail.args = new Object();

	wfMail.args.workflowPooled = wfPooled;
	wfMail.args.workflowTasks = true;
	wfMail.args.workflowTitle = mailTitle;
	wfMail.args.workflowDescription = wfDescription;
	wfMail.args.workflowPriority = wfPriority;
	wfMail.args.mailText = text;
	wfMail.args.workflowComments = comments;
	wfMail.args.workflowDocuments = wfPackage.children;
	
	if (email != null || email != ''){
		try
		{
			var mail = actions.create('mail');
			mail.parameters.to = email;
			mail.parameters.subject = subject;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;
			mail.execute(wfPackage);

		}
		catch (exception)
		{
			logger.log(exception);
		}
	}
	
	
}

function sendMailToEndUser(wfPackage, wfTitle, wfText, wfFolio, wfAnalisis, wfEquipment, wfModule, wfDesc, wfDetail, wfActions, wfPriority, wfTasks, email, subject)
{	
	var wfId = null;//wfPackage.properties['bpm:workflowInstanceId'];
	
	var template = site.childByNamePath('Configuracion/Plantillas/wf-emailEndUser-ftl.htm');
	var wfMail = new Object();
	wfMail.args = new Object();
	wfMail.args.workflowTitle = wfTitle;
	wfMail.args.ticketText = wfText;
	wfMail.args.ticketFolio = wfFolio;
	wfMail.args.ticketAnalysis = wfAnalisis;
	wfMail.args.ticketEquipment = wfEquipment;
	wfMail.args.ticketModule = wfModule;
	wfMail.args.ticketDescription = wfDesc;
	wfMail.args.ticketDetail = wfDetail;
	wfMail.args.workflowActions = wfActions;
	wfMail.args.workflowPriority = wfPriority;
	wfMail.args.workflowTasks = wfTasks;
	wfMail.args.workflowDocuments = wfPackage.children;
	if (email != null || email != ''){
		try
		{
			var mail = actions.create('mail');
			mail.parameters.to = email;
			mail.parameters.subject = subject;
			mail.parameters.template = template;
			mail.parameters.template_model = wfMail;
			mail.execute(wfPackage);
		}
		catch (exception)
		{
			logger.log(exception);
		}
	}
}