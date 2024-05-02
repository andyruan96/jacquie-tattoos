export const EmailTemplateQuestionKey = '{{formQuestion}}';
export const EmailTemplateAnswerKey = '{{formAnswer}}';
export const EmailTemplateFormResponsesKey = '{{formResponses}}';

export const EmailTemplate = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
p { display:block;margin:13px 0; }</style><!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]--><!--[if lte mso 11]>
<style type="text/css">
.mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
.mj-column-per-100 { width:100% !important; max-width: 100%; }
}</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {
table.mj-full-width-mobile { width: 100% !important; }
td.mj-full-width-mobile { width: auto !important; }
}</style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:100px;"><img height="auto" src="data:image/jpg;base64,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" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100"></td></tr></tbody></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px #F45E43;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #F45E43;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#F45E43;">Your tattoo booking form with Jacquie Tattoos</div></td></tr>${EmailTemplateFormResponsesKey}<tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#F45E43;">Thanks for booking with me! I'll respond to this form as soon as possible.</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;

export const EmailTemplateSingleFormResponse = `<tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><span style="font-family:helvetica;font-size:14px;font-weight:bold;line-height:1;text-align:left;color:#000000;">${EmailTemplateQuestionKey} </span><span style="font-family:helvetica;font-size:14px;font-weight:normal;line-height:1;text-align:left;color:#000000;">${EmailTemplateAnswerKey}</span></td></tr>`;
