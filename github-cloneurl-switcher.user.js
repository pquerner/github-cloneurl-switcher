// ==UserScript==
// @name       Github CloneURL Switcher
// @version    0.1
// @require http://code.jquery.com/jquery-latest.js
// @description  Switches clone URL so it can be used with git client "SourceTree" by Atlassian. ONLY TESTED ON WINDOWS 8.1
// @match      *://*.github.com/*
// @copyright  2014, Pascal Querner
// ==/UserScript==

$( document ).ready(function() {
    var sourcetreeAdress = 'sourcetree://cloneRepo/',
        linkSelector = '.container .minibutton.sidebar-button',
        regexPatternRepo = "(.*):\/{2}(.*)",
        protocol = window.location.protocol,
        jqLinkObj;
    
    main();
    function main() {
        if(!$(linkSelector)) {
            //Recall main, maybe its loaded now?
            //TODO: Only call once every 5 seconds and abort after a while so the browser doesnt blow up?!
            main();
        } else {
            jqLinkObj = $(linkSelector);
            var cloneLink = jqLinkObj[0];
            var repLink = fetchRepoLink(cloneLink);
            var newLink = sourcetreeAdress + protocol + "//" + repLink;
            $(cloneLink).attr('href',newLink);
            
            var newDescText = "Add this repository to SourceTree.";
            $(cloneLink).attr('aria-label', newDescText);
            $(cloneLink).attr('title', newDescText);
        }
    }
    
    /*
     * 
     * Tries to fetch the repo link
     * args: jquery object of dom node
    */
    function fetchRepoLink(obj) {
        if(obj) {
            var repoHref = $(obj).attr('href');
            var repoLink;
            var reg = new RegExp(regexPatternRepo, "g");
			var matches = reg.exec(repoHref);
            if(matches[2]) {
                repoLink = matches[2];
                return repoLink;
            }
        }
        return false;
    }
    
});
