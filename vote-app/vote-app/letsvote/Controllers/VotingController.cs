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
    [RoutePrefix("api/vote")]
    public class VotingController : ApiController
    {
        voteEntities db = new voteEntities();
        [HttpPost]
        [Route("addvote")]
        public IHttpActionResult addvote([FromBody] UserVoteModel votemodel)
        {


            Candidate candidate_db = db.Candidates.Where(p => p.Party_id == votemodel.Party_id).FirstOrDefault();
            voter voter_db = db.voters.Where(u => u.voter_id == votemodel.Voter_id).FirstOrDefault();
            if (voter_db == null || candidate_db == null)
            {
                return Ok("sorry not eligible");
            }
            vote vote_db = db.votes.Where(v=> v.Voter_id == votemodel.Voter_id).FirstOrDefault();
            if(vote_db != null)
            {
                return Ok("You have already voted");
            }
            else
            {
                vote_db = new vote
                {
                    Party_id = votemodel.Party_id,
                    Voter_id = votemodel.Voter_id,
                };
                //candidate_db.votecount++;
                int vote_count = Convert.ToInt32(candidate_db.votecount);
                candidate_db.votecount = vote_count + 1;

                db.votes.Add(vote_db);
                db.SaveChanges();
                return Ok("You have successfully voted");
            }

        }
        
    }
}
