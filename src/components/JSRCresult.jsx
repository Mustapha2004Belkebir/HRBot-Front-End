import React from 'react';
import "./JSRCresult.css";

function JSRCresult({ showResult, result }) { // Destructure the props
  return (
    <>
      {showResult && (
        <div className='JSRCresult'>
          <div className='JSRCresultLeft'>
            <div className='resultUnit'>
              <div className='resultTitle'>Matching Percentage</div>
              <div className='resultContent'>
                Shows how well your resume aligns with the job description.<br/>
                Your resume matches {result.MatchingPercentage}% of the job description for the Full Stack Developer position.
              </div>
            </div>
            <div className='resultUnit'>
              <div className='resultTitle'>Final Thoughts</div>
              <div className='resultContent'>{result.FinalThoughts || "No final thoughts available."}</div>
            </div>
            <div className='resultUnit'>
              <div className='resultTitle'>Weaknesses</div>
              <div className='resultContent'>
                Highlights the areas where your resume could be improved.
                <ul>
                  {result.Weaknesses && result.Weaknesses.length > 0
                    ? result.Weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : <li>No weaknesses listed.</li>
                  }
                </ul>
              </div>
            </div>
            <div className='resultUnit'>
              <div className='resultTitle'>Improvement Tips</div>
              <div className='resultContent'>
                Offers suggestions to enhance your resume for this specific position.
                <ul>
                  {result.ImprovementTips && result.ImprovementTips.length > 0
                    ? result.ImprovementTips.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : <li>No improvement tips available.</li>
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className='JSRCresultRight'>
            <div className='resultUnit'>
              <div className='resultTitle'>Missing Keywords</div>
              <div className='resultContent'>
                Lists important terms from the job description that are missing from your resume.
                <ul>
                  {result.MissingKeywords && result.MissingKeywords.length > 0
                    ? result.MissingKeywords.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : <li>No missing keywords listed.</li>
                  }
                </ul>
              </div>
            </div>
            <div className='resultUnit'>
              <div className='resultTitle'>Strengths</div>
              <div className='resultContent'>
                Points out where your resume matches the job requirements well.
                <ul>
                  {result.Strengths && result.Strengths.length > 0
                    ? result.Strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : <li>No strengths listed.</li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JSRCresult;
