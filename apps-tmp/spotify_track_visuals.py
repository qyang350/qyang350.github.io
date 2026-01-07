import plotly.express as px
import pandas as pd

class VisualMaker:
    def __init__(self):
        # Read the csv file into a dataframe
        self.df = pd.read_csv("sample_data/SPOTIFY_TRACK_DATASET.csv")

    def create_bubble_chart(self):
        fig = px.scatter(
            self.df.sort_values(by="Likes", ascending=False),
            x="Valence", 
            y="Danceability", 
            size="Likes", 
            hover_name="Track", 
            size_max=70,
            title="Spotify Track Bubble Chart",
            trendline="ols",
            trendline_color_override="black",
            # text="Artist"
        )
        fig.update_layout(
            plot_bgcolor='rgba(0,0,0,0)', # Transparent background for the plot area
            paper_bgcolor='rgba(0,0,0,0)', # Transparent background for the whole chart
        )
        
        # Add X-axis line (and remove grid)
        fig.update_xaxes(
            showgrid=False,
            showline=True,      
            linewidth=1,       
            linecolor='gray',  
            mirror=False         
        )

        fig.update_yaxes(
            showgrid=False,
            showline=True,
            linewidth=1,
            linecolor='gray',
            mirror=False
        )

        fig.update_traces(textposition='bottom center')
        fig.show()


if __name__ == "__main__":
    visual_maker = VisualMaker()
    print(visual_maker.df.head())
    visual_maker.create_bubble_chart()
