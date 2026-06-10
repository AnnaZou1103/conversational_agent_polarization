import { QuizQuestion } from '@/src/types/interfaces';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { RadarChart, RadarSeries } from '@mui/x-charts/RadarChart';

export default function RadarChartCard({ questions }: { questions: QuizQuestion[]; }) {
    // Only render if there are questions
    if (!questions || questions.length === 0) {
        return null;
    }

    const withOptions = (series: RadarSeries[]) =>
        series.map((item) => ({ ...item, hideMark: false, fillArea: true }));

    const padToLength = (values: number[], length: number) =>
        Array.from({ length }, (_, index) => values[index] ?? 0);

    const totalQuestions = 8;

    const metrics = Array.from({ length: totalQuestions }, (_, i) => `Q${i + 1}`);
    const answersData = padToLength(questions.map((question) => question.userAnswer), totalQuestions);
    const surveyAverageData = padToLength(questions.map((question) => question.surveyAverage), totalQuestions);

    const commonSettings = {
        height: 300,
        radar: {
            max: 4,
            metrics: metrics,
        },
    };
    const userAnswers = {
        label: 'Your answers',
        data: answersData,
    } satisfies RadarSeries;
    const surveyAverage = {
        label: 'Survey average',
        data: surveyAverageData,
    } satisfies RadarSeries;

    return (
        <div>
            <div className="mb-4 pb-4 border-b border-zinc-200 text-xs tracking-widest text-zinc-500 font-bold">
                Conversation Summary
            </div>
            <Box sx={{ width: '100%' }}>
                <Stack
                    direction="row"
                    sx={{ flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}
                >
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <RadarChart
                            {...commonSettings}
                            series={withOptions([userAnswers, surveyAverage])}
                        />
                    </Box>
                </Stack>
            </Box>
            <p className='text-xs text-center'>Scale: 1 = Never, 2 = Probably not, 3 = Probably, 4 = Definitely</p>
        </div>
    );
}

