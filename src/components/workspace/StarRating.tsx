const StarRating = ({ rate = 0 }) => {
    const maxStars = 5;

    return (
        <div>
            {[...Array(maxStars)].map((_, i) => (
                <span key={i} style={{ fontSize: '24px', color: i < rate ? 'gold' : 'lightgray' }}>
                    {i < rate ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
