$( document ).ready( function() {

  console.log( "NO PROFILE" );

  if( checkIfProfile() ) {

    console.log( "PROFILE" );

    //do rest call
    //set teams
    //set manager
    //set teams
    //set rolls
    //set district

    let credentials = "YmFja2VuZC11c2VyOmZaM0FXcDZDMWtjQmViYzQyU0tP";
    let serverUrl = "http://localhost:8080/linchpin-utils/users/mail/" + getUserMail();

    $.ajax( {
      type: 'GET',
      url: serverUrl,
      dataType: "json",
      xhrFields: {
        withCredentials: true
      }, // crossDomain: true,
      headers: {
        'Authorization': 'Basic ' + credentials
      }, //beforeSend: function (xhr) {
      //},
      success: function( result ) {
        setTeamsLink( result );
        setEmail( result );
        setManager( result );
        setDistricts(result);


        blockProfilePageUpload();
      },

      error: function( req, status, error ) {
        alert( error );
      }
    } );

  }


} );

function checkIfProfile() {
  return !!$( ".profile-information" )[0];

}

function getUserMail() {
  let quickElement = $( ".contact-information" )[0];
  let teamsElement = $( "[fieldtype='confluenceEmail']" ); //getSpan
  let userMail = teamsElement.getElementsByTagName( "a[href^='mailto:']" )[0].href;
  //remove mailto from
  userMail.replace( "mailto:", "" );
  console.log( userMail );
  return userMail;
}


function setTeamsLink( result ) {
  let teamsLinkUrl = result["teamsLink"];

  //Set TeamsLink in QuickAccess
  let quickElement = $( ".contact-information" )[0];
  let teamsElement = $( "[fieldtype='IM']" );
  teamsElement.getElementsByTagName( "a" )[0]
    .setAttribute( "href", teamsLinkUrl );


  //set TeamsLink in CompanyMenu
  let companyElement = $( "[data-fieldbk='cup.field-11']" )[0];
  companyElement.attr( 'target', '_blank' );
  companyElement.attr( 'href', teamsLinkUrl );
}


function setEmail( result ) {

  let mailTo = "mailto:";
  let mail = mailTo + result["mail"];
  let shortMail = mailTo + result["userPrincipalName"];

  let mailLink = document.createElement( 'a' );
  $( mailLink ).attr( 'href', mail )
    .attr( 'target', '_blank' )
    .attr( 'rel', 'noopener' )
    .attr( 'class', 'linkified' );

  let shortMailLink = document.createElement( 'a' );
  $( shortMailLink ).attr( 'href', shortMail )
    .attr( 'target', '_blank' )
    .attr( 'rel', 'noopener' )
    .attr( 'class', 'linkified' );


  let mailElement = $( "[data-fieldbk='cup.field-9']" )[0];

  mailElement.$( ".cup-fieldtype-INPUT" ).remove();
  mailElement.append( "<div>" + mailLink + "</div>" );
  mailElement.append( "<div>" + shortMailLink + "</div>" );

}


function setManager( result ) {
  //get Manager name
  //get acronym
  //build link
  //insert in div

  //clear div
  //ad new div

  let managerName = result["manager"]["displayName"];
  let managerAcronym = result["manager"]["userPrincipalName"].split( "@" )[0];
  let confluenceLink = "/confluence/display/~" + managerAcronym;

  //build link
  let managerLink = document.createElement( "a" );
  $( managerLink ).attr( "href", confluenceLink )
    .attr( "target", "_blank" )
    .addClass( "confluence-userlink" )
    .addClass( "user-mention" )
    .addClass( "userlink - 0" )
    .attr( "data-username", managerAcronym )
    .attr( "data-user-hover-bound", true );
  $( managerLink ).innerHTML = managerName;



  let managerElement = $( "[data-fieldbk='cup.field-26']" )[0];
  managerElement.$( ".cup-fieldtype-INPUT" ).remove(); //TODO find value to remove
  managerElement.append( "<div>" + managerLink + "</div>" );

}


function setDistricts(result) {



}


function blockProfilePageUpload() {
  let element = document.getElementsByClassName( "profile-showcase-top-left" )[0];
  element.style().display = "none";
}
