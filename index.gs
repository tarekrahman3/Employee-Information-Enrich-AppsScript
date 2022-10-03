/*
 * @param {String} first_name - The string
 * @param {String} last_name - The string
 * @param {String} company - The string
 * @param {String} domain - The string
 * @param {String} api_key - The string
 */
function single_enrich(first_name,last_name,company,domain,api_key) {
  const response = people_match_api(first_name,last_name,company,domain,api_key)
  const response_headers = response.getHeaders();
  console.log(response.getContentText(),response_headers)
  try {
    let result = JSON.parse(response.getContentText());
    return [
      [
        result.person.email,
        result.person.email_status,
        result.person.title,
        result.person.linkedin_url,
        result.person.state,
        result.person.country,
        `${response_headers['x-hourly-requests-left']} - hourly-requests-left`,
        `${response_headers['x-24-hour-requests-left']} - daily-requests-left`,
        `${response_headers['x-minute-requests-left']} - minute-requests-left`,
      ]
    ]
  } catch {
    return [
      [
        response.getContentText()
      ]
    ]
  }
}

function people_match_api(first_name,last_name,company,domain,api_key){
  return UrlFetchApp.fetch("https://api.apollo.io/v1/people/match", {
		"method": "POST",
		"headers": {
			"Cache-Control": "no-cache",
			"Content-Type": "application/json"
		},
		"muteHttpExceptions": true,
		"followRedirects": true,
		"validateHttpsCertificates": true,
		"contentType": "application/json",
		"payload": JSON.stringify({
      "api_key":api_key,
      "first_name":first_name,
      "last_name":last_name,
      "organization_name":company,
      "domain":domain
    })
	})
}


function test(){
  const resp = people_match_api('Kathy',	'Rinkacs',	'Tesla',	'tesla.com','<API Key>')
}
