import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface QuestionAccordionProps {
    question: string;
    answer: string;
}

const QuestionAccordion = ({question, answer}: QuestionAccordionProps) => {
    return (
        <Accordion
            sx={{
                marginTop: {xs: "0.5rem"},
                padding: {xs: "0.25rem 0.5rem"},
                textAlign: {xs: "left"}
            }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="primary" variant="h5" component="h2">
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default QuestionAccordion;