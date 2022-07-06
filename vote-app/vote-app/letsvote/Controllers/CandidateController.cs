using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using letsvote.DataAccess;
using letsvote.Models;

namespace letsvote.Controllers
{
    [RoutePrefix("api/candidate")]
    public class CandidateController : ApiController
    {
        voteEntities db = new voteEntities();
        [HttpGet]
        [Route("getallcandidates")]
        public IHttpActionResult getAllCandidates()
        {
            List<Candidate> candidates = db.Candidates.ToList();
            return Ok(candidates);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetCandidates(int id)
        {
            Candidate candidate = db.Candidates.Where(p => p.Party_id == id).FirstOrDefault();

            return Ok(candidate);
        }
        [HttpGet]
        [Route("winner")]
        public IHttpActionResult Getwinner()
        {
            //var result = db.Candidates.Where(p => p.Party_id == Candidate.Max(y => y.votecount)).FirstOrDefault();
            int winner = db.Candidates.Max(p => p.votecount).GetValueOrDefault();
            Candidate candidate = db.Candidates.Where(p => p.votecount == winner).FirstOrDefault();

            return Ok(candidate);
        }

    }
}
